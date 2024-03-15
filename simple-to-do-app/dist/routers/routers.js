"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = __importDefault(require("../controllers/controllers"));
const router = express.Router();
router.post('/todos', controllers_1.default.post);
router.get('/todos', controllers_1.default.get_all);
router.get('/todos/:id', controllers_1.default.get_by_id);
router.put('/todos/:id', controllers_1.default.put);
router.delete('/todos/:id', controllers_1.default.delete_by_id);
exports.default = router;
