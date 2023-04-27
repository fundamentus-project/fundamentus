export class BaseException extends Error {
    status;
    code;
    extensions;
    constructor(message, status, code, extensions) {
        super(message);
        this.status = status;
        this.code = code;
        this.extensions = extensions || {};
    }
}
