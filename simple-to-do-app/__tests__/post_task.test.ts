import request from 'supertest';
import { createApp } from '../utils/server';
const app = createApp();
import { setupMockMongoDB,teardownMockMongoDB } from './config/database';
let jwtToken:any
describe("POST METHOD",()=>{
    beforeAll(async()=>{
        await setupMockMongoDB();
        await request(app).post('/api/auth/signup').send({
            "username":"Yodanos",
            "password":"Yordianos"
        });
        jwtToken = await request(app).post('/api/auth/login').send({
            "username":"Yodanos",
            "password":"Yordianos"
        });
    })
    afterAll(async()=>{
        await teardownMockMongoDB();
    })
    describe("POST /api/todos",()=>{
        test("Given the task data it should save to the server and return the saved object", async()=>{

            const response = await request(app).post('/api/todos').send({
                "title":"goto home",
                "description":"this time to go home",
                "completed":false
            }).set('x-access-token',jwtToken.body.token);

            expect(response.status).toBe(201);
            expect(response.body.taskId).toBeDefined();
            expect(response.body.title).toBe("goto home");
            expect(response.body.description).toBe("this time to go home");
            expect(response.body.completed).toBe(false);

        })
        test("Not given appropriate task data it should return 422 status code with error object", async()=>{
            const response = await request(app).post('/api/todos').send({
                "title":"goto home",
                "description":"this time to go home",
            }).set('x-access-token',jwtToken.body.token);

            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('errors');

        })
    })
    })