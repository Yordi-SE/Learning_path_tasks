"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../model/db"));
const not_found_1 = __importDefault(require("../errors/not_found"));
const badrequest_1 = __importDefault(require("../errors/badrequest"));
const validation_1 = __importDefault(require("../joi_validation/validation"));
const validation_2 = __importDefault(require("../errors/validation"));
const route_params_1 = __importDefault(require("../joi_validation/route_params"));
const post = (req, res, next) => {
    const validation = validation_1.default.validate(req.body);
    if (validation.error) {
        throw new validation_2.default({ message: validation.error.details[0].message });
    }
    db_1.default.create(req.body).then((data) => {
        if (data) {
            res.status(201).json(data);
        }
        else {
            throw new badrequest_1.default({ message: "some field is missing" });
        }
    }).catch((error) => {
        next(error);
    });
};
const get_all = (req, res, next) => {
    db_1.default.find().then((data) => {
        if (data) {
            res.json(data);
        }
        else {
            throw new not_found_1.default({ message: "task not found" });
        }
    }).catch((error) => {
        next(error);
    });
};
const get_by_id = (req, res, next) => {
    const validation = route_params_1.default.validate(req.params);
    if (validation.error) {
        throw new validation_2.default({ message: validation.error.details[0].message });
    }
    db_1.default.findById(req.params.id).then((data) => {
        if (data) {
            res.json(data);
        }
        else {
            throw new not_found_1.default({ message: "task not found" });
        }
    }).catch((error) => {
        next(error);
    });
};
const put = (req, res, next) => {
    const idValidation = route_params_1.default.validate(req.params);
    if (idValidation.error) {
        throw new validation_2.default({ message: idValidation.error.details[0].message });
    }
    const validation = validation_1.default.validate(req.body);
    if (validation.error) {
        throw new validation_2.default({ message: validation.error.details[0].message });
    }
    db_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((data) => {
        if (data) {
            res.json(data);
        }
        else {
            throw new not_found_1.default({ message: "task not found" });
        }
    }).catch((error) => {
        next(error);
    });
};
const delete_by_id = (req, res, next) => {
    const validation = route_params_1.default.validate(req.params);
    if (validation.error) {
        throw new validation_2.default({ message: validation.error.details[0].message });
    }
    db_1.default.findByIdAndDelete(req.params.id).then((data) => {
        if (data) {
            res.status(204).send();
        }
        else {
            throw new not_found_1.default({ message: "task not found" });
        }
    }).catch((error) => {
        next(error);
    });
};
exports.default = {
    post: post,
    get_all: get_all,
    get_by_id: get_by_id,
    put: put,
    delete_by_id: delete_by_id
};
