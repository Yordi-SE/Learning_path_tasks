"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const custome_errors_1 = require("./errors/custome_errors");
const routers_1 = __importDefault(require("./routers/routers"));
require("express-async-errors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', routers_1.default);
app.use((err, req, res, next) => {
    if (err instanceof custome_errors_1.CustomError) {
        const { statusCode, errors } = err;
        return res.status(statusCode).send({ errors });
    }
    return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
});
app.listen(port, hostname, () => {
    console.log('Express Server is started at ' + port);
});
