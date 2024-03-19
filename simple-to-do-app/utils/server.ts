import express = require('express');
import router from '../routers/routers';
import "express-async-errors";
import error_handler from '../errors/custome_handler';
import authRouter from '../routers/authRouters';
import logger = require('morgan');
import bodyParser = require('body-parser');

export const createApp = function(){

    const app:express.Application =  express();
    app.use(express.json());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    })
    app.use('/api',router);
    app.use('/api/auth',authRouter);
    app.use(error_handler)
    return app;
  }