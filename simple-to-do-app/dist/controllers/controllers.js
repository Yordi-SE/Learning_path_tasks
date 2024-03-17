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
    const task = Object.assign(Object.assign({}, req.body), { userId: req.userId });
    db_1.default.create(task).then((data) => {
        if (data) {
            res.status(201).json({ taskId: task._id, title: task.title, description: task.description, completed: task.completed });
        }
        else {
            throw new badrequest_1.default({ message: "some field is missing" });
        }
    }).catch((error) => {
        next(error);
    });
};
const get_all = (req, res, next) => {
    db_1.default.find({ userId: req.userId }).then((data) => {
        if (data) {
            res.json(data.map((task) => { return { taskId: task._id, title: task.title, description: task.description, completed: task.completed }; }));
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
            res.json({ taskId: data._id, title: data.title, description: data.description, completed: data.completed });
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
    const task = Object.assign(Object.assign({}, req.body), { userId: req.userId });
    db_1.default.findByIdAndUpdate(req.params.id, task, { new: true }).then((data) => {
        if (data) {
            res.json({ taskId: data._id, title: data.title, description: data.description, completed: data.completed });
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
