"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const IdSchema = joi.object().keys({
    id: joi.string().length(24).hex().required()
});
exports.default = IdSchema;
