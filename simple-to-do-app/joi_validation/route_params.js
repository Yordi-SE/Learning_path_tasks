"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const IdSchema = joi_1.default.object().keys({
    id: joi_1.default.string().length(24).hex().required()
});
exports.default = IdSchema;
