import { parseJSON } from '@directus/utils';
import { Redis } from 'ioredis';
import env from './env.js';
import { getConfigFromEnv } from './utils/get-config-from-env.js';
export class MessengerMemory {
    handlers;
    constructor() {
        this.handlers = {};
    }
    publish(channel, payload) {
        this.handlers[channel]?.(payload);
    }
    subscribe(channel, callback) {
        this.handlers[channel] = callback;
    }
    unsubscribe(channel) {
        delete this.handlers[channel];
    }
}
export class MessengerRedis {
    namespace;
    pub;
    sub;
    constructor() {
        const config = getConfigFromEnv('MESSENGER_REDIS');
        this.pub = new Redis(env['MESSENGER_REDIS'] ?? config);
        this.sub = new Redis(env['MESSENGER_REDIS'] ?? config);
        this.namespace = env['MESSENGER_NAMESPACE'] ?? 'directus';
    }
    publish(channel, payload) {
        this.pub.publish(`${this.namespace}:${channel}`, JSON.stringify(payload));
    }
    subscribe(channel, callback) {
        this.sub.subscribe(`${this.namespace}:${channel}`);
        this.sub.on('message', (messageChannel, payloadString) => {
            const payload = parseJSON(payloadString);
            if (messageChannel === `${this.namespace}:${channel}`) {
                callback(payload);
            }
        });
    }
    unsubscribe(channel) {
        this.sub.unsubscribe(`${this.namespace}:${channel}`);
    }
}
let messenger;
export function getMessenger() {
    if (messenger)
        return messenger;
    if (env['MESSENGER_STORE'] === 'redis') {
        messenger = new MessengerRedis();
    }
    else {
        messenger = new MessengerMemory();
    }
    return messenger;
}
