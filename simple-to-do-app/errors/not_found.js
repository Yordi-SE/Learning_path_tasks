"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custome_errors_1 = require("./custome_errors");
class NotFound extends custome_errors_1.CustomError {
    constructor(params) {
        const { code, message } = params || {};
        super(message || "Not Found");
        this._code = code || NotFound._statusCode;
        this._context = (params === null || params === void 0 ? void 0 : params.context) || {};
        Object.setPrototypeOf(this, NotFound.prototype);
    }
    get errors() {
        return [{ message: this.message, context: this._context }];
    }
    get statusCode() {
        return this._code;
    }
}
NotFound._statusCode = 404;
exports.default = NotFound;
