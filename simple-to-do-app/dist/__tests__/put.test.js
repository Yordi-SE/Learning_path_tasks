"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../utils/server");
const app = (0, server_1.createApp)();
<<<<<<< HEAD
const mongodb_1 = require("mongodb");
=======
>>>>>>> 7891632 (add unittest for the task endpoints)
const database_1 = require("./config/database");
let jwtToken;
describe("PUT METHOD", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.setupMockMongoDB)();
        yield (0, supertest_1.default)(app).post('/api/auth/signup').send({
            "username": "Yodanos",
            "password": "Yordianos"
        });
        jwtToken = yield (0, supertest_1.default)(app).post('/api/auth/login').send({
            "username": "Yodanos",
            "password": "Yordianos"
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.teardownMockMongoDB)();
    }));
    describe("put /api/todos/:id", () => {
        test("Give id of the task and task object it should update and  return the specific task", () => __awaiter(void 0, void 0, void 0, function* () {
            const posted = yield (0, supertest_1.default)(app).post('/api/todos').send({
                "title": "goto home",
                "description": "this time to go home",
                "completed": false
            }).set('x-access-token', jwtToken.body.token);
            const response = yield (0, supertest_1.default)(app).put('/api/todos/' + posted.body.taskId).send({
                "title": "Don't go home",
                "description": "Not this time to go home",
                "completed": true
            }).set('x-access-token', jwtToken.body.token);
            expect(response.status).toBe(200);
<<<<<<< HEAD
            expect(response.body.taskId).toBeDefined();
=======
            expect(response.body.taskId).toBeTruthy();
>>>>>>> 7891632 (add unittest for the task endpoints)
            expect(response.body.title).toBe("Don't go home");
            expect(response.body.description).toBe("Not this time to go home");
            expect(response.body.completed).toBe(true);
        }));
        test("Not Give an appropriate id of the task it should return 422 with error object", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).put('/api/todos/' + "not appropriate").send({
                "title": "Don't go home",
                "description": "Not this time to go home",
                "completed": true
            }).set('x-access-token', jwtToken.body.token);
            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('errors');
        }));
        test("Not given an appropriate task object it should return 422 with error object", () => __awaiter(void 0, void 0, void 0, function* () {
            const posted = yield (0, supertest_1.default)(app).post('/api/todos').send({
                "title": "goto home",
                "description": "this time to go home",
                "completed": false
            }).set('x-access-token', jwtToken.body.token);
            const response = yield (0, supertest_1.default)(app).put('/api/todos/' + posted.body.taskId).send({
                "title": "Don't go home",
                "completed": true
            }).set('x-access-token', jwtToken.body.token);
            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('errors');
        }));
<<<<<<< HEAD
        test("Given an appropriate id of the task and if task not found, it should return 404 status code with error object", () => __awaiter(void 0, void 0, void 0, function* () {
            const object_id = new mongodb_1.ObjectId();
            const response = yield (0, supertest_1.default)(app).put('/api/todos/' + object_id.valueOf()).send({
                "title": "goto home",
                "description": "this time to go home",
                "completed": false
            }).set('x-access-token', jwtToken.body.token);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('errors');
        }));
=======
>>>>>>> 7891632 (add unittest for the task endpoints)
    });
});
