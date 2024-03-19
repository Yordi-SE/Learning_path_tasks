import request from 'supertest';
import { createApp } from '../utils/server';
const app = createApp();
import { setupMockMongoDB,teardownMockMongoDB } from './config/database';
let jwtToken:any
describe("PUT METHOD",()=>{
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
    describe("put /api/todos/:id",()=>{
        test("Give id of the task and task object it should update and  return the specific task", async()=>{
            const posted = await request(app).post('/api/todos').send({
                "title":"goto home",
                "description":"this time to go home",
                "completed":false
            }).set('x-access-token',jwtToken.body.token);
            const response = await request(app).put('/api/todos/' + posted.body.taskId).send({
                "title":"Don't go home",
                "description":"Not this time to go home",
                "completed":true
            }).set('x-access-token',jwtToken.body.token);
            expect(response.status).toBe(200);
            expect(response.body.taskId).toBeTruthy();
            expect(response.body.title).toBe("Don't go home");
            expect(response.body.description).toBe("Not this time to go home");
            expect(response.body.completed).toBe(true);


        })
        test("Not Give an appropriate id of the task it should return 422 with error object", async()=>{
            const response = await request(app).put('/api/todos/'+"not appropriate").send({
                "title":"Don't go home",
                "description":"Not this time to go home",
                "completed":true
            }).set('x-access-token',jwtToken.body.token);
            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('errors');

        })
        test("Not given an appropriate task object it should return 422 with error object", async()=>{
            const posted = await request(app).post('/api/todos').send({
                "title":"goto home",
                "description":"this time to go home",
                "completed":false
            }).set('x-access-token',jwtToken.body.token);
            const response = await request(app).put('/api/todos/' + posted.body.taskId).send({
                "title":"Don't go home",
                "completed":true
            }).set('x-access-token',jwtToken.body.token);
            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('errors');


        })
    })
    })