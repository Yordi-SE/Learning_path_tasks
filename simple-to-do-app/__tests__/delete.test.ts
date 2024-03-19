import request from 'supertest';
import { createApp } from '../utils/server';
const app = createApp();
import { setupMockMongoDB,teardownMockMongoDB } from './config/database';
import exp from 'constants';
let jwtToken:any
describe("DELETE METHOD",()=>{
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
    describe("delete /api/todos/:id",()=>{
        test("Give id of the task it should delete and return the statuscode 203", async()=>{
            const posted = await request(app).post('/api/todos').send({
                "title":"goto home",
                "description":"this time to go home",
                "completed":false
            }).set('x-access-token',jwtToken.body.token);

            const response = await request(app).delete('/api/todos/' + posted.body.taskId).send().set('x-access-token',jwtToken.body.token);
            expect(response.status).toBe(204);
            expect(response.body).toStrictEqual({});
        })
        test("Not given an appropriate id of the task it should return 422 status code with error object", async()=>{

            const response = await request(app).delete('/api/todos/' + "notidofthetask").send().set('x-access-token',jwtToken.body.token);
            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('errors');
        })

    })
    })