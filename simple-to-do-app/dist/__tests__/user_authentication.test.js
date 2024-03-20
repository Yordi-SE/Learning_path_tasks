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
const database_1 = require("./config/database");
let jwtToken;
describe("USER AUTHENTICATION METHOD", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.setupMockMongoDB)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.teardownMockMongoDB)();
    }));
    describe("POST /api/auth/login", () => {
        test("Given correct username and password it should check the user password and return jwt authentication token to the client", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app).post('/api/auth/signup').send({
                "username": "Yordanos",
                "password": "YordanosPasword"
            });
            const response = yield (0, supertest_1.default)(app).post('/api/auth/login').send({
                "username": "Yordanos",
                "password": "YordanosPasword"
            });
            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
        }));
        test("Not given appropriate user data it should return 422 status code with error object", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/api/auth/login').send({
                "username": "",
                "password": "YordanosPasword"
            });
            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('errors');
        }));
        test("Given  username and password,if user not registered it should check  and return 404 and error object", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/api/auth/login').send({
                "username": "Abebe Besso",
                "password": "YordanosPasword"
            });
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('errors');
        }));
        test("Given Wrong Password it should return 400 with error object", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app).post('/api/auth/signup').send({
                "username": "Yordanos",
                "password": "YordanosPasword"
            });
            const response = yield (0, supertest_1.default)(app).post('/api/auth/login').send({
                "username": "Yordanos",
                "password": "YordanosPaord"
            });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
        }));
    });
});
