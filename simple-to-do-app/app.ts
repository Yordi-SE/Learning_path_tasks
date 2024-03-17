import express = require('express');
import router from './routers/routers';
import "express-async-errors";
import error_handler from './errors/custome_handler';
import authRouter from './routers/authRouters';
import logger = require('morgan');
import bodyParser = require('body-parser');
const app:express.Application = express();
const hostname: string = '127.0.0.1';
const port: number = 3000;
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
})
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api',router);
app.use('/auth',authRouter);
app.use(error_handler)
app.listen(port,hostname,()=>{
  console.log('Express Server is started at ' + port)
})