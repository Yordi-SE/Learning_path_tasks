"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express = require("express");
const routers_1 = __importDefault(require("../routers/routers"));
require("express-async-errors");
const custome_handler_1 = __importDefault(require("../errors/custome_handler"));
const authRouters_1 = __importDefault(require("../routers/authRouters"));
const logger = require("morgan");
const bodyParser = require("body-parser");
const createApp = function () {
    const app = express();
    app.use(express.json());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.use('/api', routers_1.default);
    app.use('/api/auth', authRouters_1.default);
    app.use(custome_handler_1.default);
    return app;
};
exports.createApp = createApp;
