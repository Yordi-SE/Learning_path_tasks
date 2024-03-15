"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const schema = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    completed: joi.boolean().required()
});
exports.default = schema;
