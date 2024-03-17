"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("./auth.config"));
const badrequest_1 = __importDefault(require("../errors/badrequest"));
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        throw new badrequest_1.default({ code: 403, message: "No token provided!" });
    }
    jsonwebtoken_1.default.verify(token, auth_config_1.default.secret, (err, decoded) => {
        if (err) {
            throw new badrequest_1.default({ code: 401, message: "Unauthorized!" });
        }
        if (decoded) {
            req.userId = decoded.id;
        }
        next();
    });
};
exports.default = verifyToken;
