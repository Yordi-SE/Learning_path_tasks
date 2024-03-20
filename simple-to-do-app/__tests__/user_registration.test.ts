import request from 'supertest';
import { createApp } from '../utils/server';
const app = createApp();
import { setupMockMongoDB,teardownMockMongoDB } from './config/database';
let jwtToken:any
describe("USER REGISTRATION METHOD",()=>{
    beforeAll(async()=>{
        await setupMockMongoDB();
    })
    afterAll(async()=>{
        await teardownMockMongoDB();
    })
    describe("POST /api/auth/signup",()=>{
        test("Given the user data it should save to the server and return the saved object username", async()=>{

            const response = await request(app).post('/api/auth/signup').send({
                "username":"Yordanos",
                "password":"YordanosPasword"
            })

            expect(response.status).toBe(201);
            expect(response.body.username).toBe("Yordanos");

        })
        test("Not given appropriate user data it should return 422 status code with error object", async()=>{
            const response = await request(app).post('/api/auth/signup').send({
                "username":"",
                "password":"YordanosPasword"
            });

            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('errors');

        })
        test("Given user data and username already exits, it should return 400 status code with error object", async()=>{
            await request(app).post('/api/auth/signup').send({
                "username":"Yordanos",
                "password":"YordanosPasword"
            })
            const response = await request(app).post('/api/auth/signup').send({
                "username":"Yordanos",
                "password":"YordanosPasword"
            });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');

        })
    })
    })