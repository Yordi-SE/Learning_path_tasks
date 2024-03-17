"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const schema = joi.object().keys({
    username: joi.string().required().min(3),
    password: joi.string().required().min(5)
});
exports.default = schema;
