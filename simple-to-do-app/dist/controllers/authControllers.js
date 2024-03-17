"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const User_validation_1 = __importDefault(require("../joi_validation/User_validation"));
const validation_1 = __importDefault(require("../errors/validation"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_config_1 = __importDefault(require("../jwt/auth.config"));
const user_1 = __importDefault(require("../model/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const badrequest_1 = __importDefault(require("../errors/badrequest"));
const not_found_1 = __importDefault(require("../errors/not_found"));
const signup = (req, res, next) => {
    const { error } = User_validation_1.default.validate(req.body);
    if (error) {
        throw new validation_1.default({ message: error.details[0].message });
    }
    user_1.default.findOne({ username: req.body.username }).exec().then((data) => {
        if (data) {
            throw new badrequest_1.default({ message: "username already exists" });
        }
        else {
            user_1.default.create(req.body).then((data) => {
                if (data) {
                    res.status(201).json({ id: data._id, username: data.username });
                }
                else {
                    throw new badrequest_1.default({ message: "some field is missing" });
                }
            }).catch((error) => {
                next(error);
            });
        }
    }).catch((error) => {
        next(error);
    });
};
exports.signup = signup;
const signin = (req, res, next) => {
    user_1.default.findOne({ username: req.body.username }).exec().then((data) => {
        if (data) {
            const passwordIsValid = bcrypt_1.default.compareSync(req.body.password, data.password);
            if (!passwordIsValid) {
                throw new badrequest_1.default({ message: "Invalid Password!" });
            }
            const token = jsonwebtoken_1.default.sign({ id: data._id }, auth_config_1.default.secret, {
                algorithm: "HS256", allowInsecureKeySizes: true, expiresIn: 86400
            });
            res.status(200).json({ user_id: data._id, token: token });
        }
        else {
            throw new not_found_1.default({ message: "User Not found" });
        }
    }).catch((error) => {
        next(error);
    });
};
exports.signin = signin;
