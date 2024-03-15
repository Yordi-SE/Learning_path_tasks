"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custome_errors_1 = require("./custome_errors");
class ValidationError extends custome_errors_1.CustomError {
    constructor(params) {
        const { code, message } = params || {};
        super(message || "validation error");
        this._code = code || ValidationError._statusCode;
        this._context = (params === null || params === void 0 ? void 0 : params.context) || {};
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    get errors() {
        return [{ message: this.message, context: this._context }];
    }
    get statusCode() {
        return this._code;
    }
}
ValidationError._statusCode = 422;
exports.default = ValidationError;
