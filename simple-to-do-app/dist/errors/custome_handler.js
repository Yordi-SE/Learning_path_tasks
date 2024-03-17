"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custome_errors_1 = require("./custome_errors");
exports.default = (err, req, res, next) => {
    if (err instanceof custome_errors_1.CustomError) {
        const { statusCode, errors } = err;
        return res.status(statusCode).send({ errors });
    }
    return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
