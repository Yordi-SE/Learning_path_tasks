import { CustomError } from "./custome_errors";

export default class ValidationError extends CustomError {
  private static readonly _statusCode = 422;
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params?: {code?: number, message?: string, logging?: boolean, context?: { [key: string]: any }}) {
    const { code, message, logging } = params || {};
    
    super(message || "validation error");
    this._code = code || ValidationError._statusCode;
    this._logging = logging || false;
    this._context = params?.context || {};

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}