import dotenv from 'dotenv';
dotenv.config({path: './config.env'});
import express = require('express');
import "express-async-errors";
import { createApp } from './utils/server';
import { db } from './model/db';
const app:express.Application = createApp();
const hostname: string = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
db();
app.listen(port,hostname,()=>{
  console.log('Express Server is started at ' + port)
})