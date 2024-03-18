"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const validation_1 = __importDefault(require("../errors/validation"));
const IdSchema = joi.object().keys({
    id: joi.string().length(24).hex().required()
});
const validate_param = (req, res, next) => {
    const validation = IdSchema.validate(req.params);
    if (validation.error) {
        throw new validation_1.default({ message: validation.error.details[0].message });
    }
    next();
};
exports.default = validate_param;
