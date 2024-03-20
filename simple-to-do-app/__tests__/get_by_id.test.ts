import request from 'supertest';
import { createApp } from '../utils/server';
const app = createApp();
import { ObjectId } from 'mongodb';
import { setupMockMongoDB,teardownMockMongoDB } from './config/database';
let jwtToken:any
describe("GET BY ID METHOD",()=>{
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
    describe("get /api/todos/:id",()=>{
        test("Give id of the task it should return the specific task", async()=>{
            const posted = await request(app).post('/api/todos').send({
                "title":"goto home",
                "description":"this time to go home",
                "completed":false
            }).set('x-access-token',jwtToken.body.token);

            const response = await request(app).get('/api/todos/' + posted.body.taskId).send().set('x-access-token',jwtToken.body.token);
            expect(response.status).toBe(200);
            expect(response.body.taskId).toBeDefined();
            expect(response.body.title).toBe("goto home");
            expect(response.body.description).toBe("this time to go home");
            expect(response.body.completed).toBe(false);
        })
        test("Not given an appropriate id of the task it should return 422 status code with error object", async()=>{

            const response = await request(app).get('/api/todos/' + "not id of the task").send().set('x-access-token',jwtToken.body.token);
            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('errors');
        })
        test("Given an appropriate id of the task and if task not found, it should return 404 status code with error object", async()=>{
            const object_id = new ObjectId();
            const response = await request(app).get('/api/todos/' + object_id.valueOf()).send().set('x-access-token',jwtToken.body.token);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('errors');
        })

    })
    })