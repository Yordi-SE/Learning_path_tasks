"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const User_validation_1 = __importDefault(require("../joi_validation/User_validation"));
const router = (0, express_1.Router)();
router.post('/login', User_validation_1.default, authControllers_1.signin);
router.post('/signup', User_validation_1.default, authControllers_1.signup);
exports.default = router;
