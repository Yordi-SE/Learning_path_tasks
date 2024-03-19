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
describe("USER REGISTRATION METHOD", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.setupMockMongoDB)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.teardownMockMongoDB)();
    }));
    describe("POST /api/auth/signup", () => {
        test("Given the user data it should save to the server and return the saved object username and id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/api/auth/signup').send({
                "username": "Yordanos",
                "password": "YordanosPasword"
            });
            expect(response.status).toBe(201);
            expect(response.body.id).toBeTruthy();
            expect(response.body.username).toBe("Yordanos");
        }));
        // test("Not given appropriate user data it should return 422 status code with error object", async()=>{
        //     const response = await request(app).post('/api/todos').send({
        //         "title":"goto home",
        //         "description":"this time to go home",
        //     }).set('x-access-token',jwtToken.body.token);
        //     expect(response.status).toBe(422);
        //     expect(response.body).toHaveProperty('errors');
        // })
    });
});