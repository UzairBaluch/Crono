export class ApiError extends Error {
    statusCode;
    code;
    constructor(message, statusCode, code) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.code = code;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
