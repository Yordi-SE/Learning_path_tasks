import request from 'supertest';
import { createApp } from '../utils/server';
const app = createApp();
import { setupMockMongoDB,teardownMockMongoDB } from './config/database';
let jwtToken:any
describe("USER AUTHENTICATION METHOD",()=>{
    beforeAll(async()=>{
        await setupMockMongoDB();
    })
    afterAll(async()=>{
        await teardownMockMongoDB();
    })
    describe("POST /api/auth/login",()=>{
        test("Given correct username and password it should check the user password and return jwt authentication token to the client", async()=>{

            await request(app).post('/api/auth/signup').send({
                "username":"Yordanos",
                "password":"YordanosPasword"
            })
            const response = await request(app).post('/api/auth/login').send({
                "username":"Yordanos",
                "password":"YordanosPasword"
            })

            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();

        })
        test("Not given appropriate user data it should return 422 status code with error object", async()=>{
            const response = await request(app).post('/api/auth/login').send({
                "username":"",
                "password":"YordanosPasword"
            });

            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('errors');

        })
        test("Given  username and password,if user not registered it should check  and return 404 and error object", async()=>{
            const response = await request(app).post('/api/auth/login').send({
                "username":"Abebe Besso",
                "password":"YordanosPasword"
            });

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('errors');

        })
        test("Given Wrong Password it should return 400 with error object", async()=>{
            await request(app).post('/api/auth/signup').send({
                "username":"Yordanos",
                "password":"YordanosPasword"
            })
            const response = await request(app).post('/api/auth/login').send({
                "username":"Yordanos",
                "password":"YordanosPaord"
            });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
        })
        
    })
    })