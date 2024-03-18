"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const validation_1 = __importDefault(require("../errors/validation"));
const schema = joi.object().keys({
    username: joi.string().required().min(3),
    password: joi.string().required().min(5)
});
const validate_user = (req, res, next) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
        throw new validation_1.default({ message: validation.error.details[0].message });
    }
    next();
};
exports.default = validate_user;
