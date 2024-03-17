"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = __importDefault(require("../controllers/controllers"));
const auth_1 = __importDefault(require("../jwt/auth"));
const router = express.Router();
router.post('/todos', auth_1.default, controllers_1.default.post);
router.get('/todos', auth_1.default, controllers_1.default.get_all);
router.get('/todos/:id', auth_1.default, controllers_1.default.get_by_id);
router.put('/todos/:id', auth_1.default, controllers_1.default.put);
router.delete('/todos/:id', auth_1.default, controllers_1.default.delete_by_id);
exports.default = router;
