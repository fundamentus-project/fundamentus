import { validateIP } from './validate-ip.js';
export const responseInterceptor = async (config) => {
    await validateIP(config.request.socket.remoteAddress, config.request.url);
    return config;
};
