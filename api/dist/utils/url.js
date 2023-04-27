import { URL } from 'url';
export class Url {
    protocol;
    host;
    port;
    path;
    query;
    hash;
    constructor(url) {
        const parsedUrl = new URL(url, 'http://localhost');
        const isProtocolRelative = /^\/\//.test(url);
        const isRootRelative = /^\/$|^\/[^/]/.test(url);
        const isPathRelative = /^\./.test(url);
        this.protocol =
            !isProtocolRelative && !isRootRelative && !isPathRelative
                ? parsedUrl.protocol.substring(0, parsedUrl.protocol.length - 1)
                : null;
        this.host = !isRootRelative && !isPathRelative ? parsedUrl.hostname : null;
        this.port = parsedUrl.port !== '' ? parsedUrl.port : null;
        this.path = parsedUrl.pathname.split('/').filter((p) => p !== '');
        this.query = Object.fromEntries(parsedUrl.searchParams.entries());
        this.hash = parsedUrl.hash !== '' ? parsedUrl.hash.substring(1) : null;
    }
    isAbsolute() {
        return this.protocol !== null && this.host !== null;
    }
    isProtocolRelative() {
        return this.protocol === null && this.host !== null;
    }
    isRootRelative() {
        return this.protocol === null && this.host === null;
    }
    addPath(...paths) {
        const pathToAdd = paths.flatMap((p) => String(p).split('/')).filter((p) => p !== '');
        for (const pathSegment of pathToAdd) {
            if (pathSegment === '..') {
                this.path.pop();
            }
            else if (pathSegment !== '.') {
                this.path.push(pathSegment);
            }
        }
        return this;
    }
    setQuery(key, value) {
        this.query[key] = value;
        return this;
    }
    toString({ rootRelative } = { rootRelative: false }) {
        const protocol = this.protocol !== null ? `${this.protocol}:` : '';
        const host = this.host ?? '';
        const port = this.port !== null ? `:${this.port}` : '';
        const origin = `${this.host !== null ? `${protocol}//` : ''}${host}${port}`;
        const path = this.path.length ? `/${this.path.join('/')}` : '';
        const query = Object.keys(this.query).length !== 0 ? `?${new URLSearchParams(this.query).toString()}` : '';
        const hash = this.hash !== null ? `#${this.hash}` : '';
        return `${!rootRelative ? origin : ''}${path}${query}${hash}`;
    }
}
