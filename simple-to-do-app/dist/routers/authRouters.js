"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const router = (0, express_1.Router)();
router.post('/login', authControllers_1.signin);
router.post('/signup', authControllers_1.signup);
exports.default = router;