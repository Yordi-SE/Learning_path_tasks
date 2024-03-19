import request from 'supertest';
import { createApp } from '../utils/server';
const app = createApp();
import { setupMockMongoDB,teardownMockMongoDB } from './config/database';
let jwtToken:any
describe("GET ALL METHOD",()=>{
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
    describe("get /api/todos",()=>{
        test("If task available on the database it should return all task of the current user", async()=>{

            const response = await request(app).get('/api/todos').send().set('x-access-token',jwtToken.body.token);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        })

    })
    })