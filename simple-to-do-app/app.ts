import express, { NextFunction } from 'express';
import { CustomError } from './errors/custome_errors';
import router from './routers/routers';
import "express-async-errors";
import logger = require('morgan');
import bodyParser = require('body-parser');
const app:express.Application = express();
const hostname: string = '127.0.0.1';
const port: number = 3000;
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api',router);
app.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
    // Handled errors
    if(err instanceof CustomError) {
      const { statusCode, errors, logging } = err;
      if(logging) {
        console.error(JSON.stringify({
          code: err.statusCode,
          errors: err.errors,
          stack: err.stack,
        }, null, 2));
      }
  
      return res.status(statusCode).send({ errors });
    }
  
    // Unhandled errors
    console.error(JSON.stringify(err, null, 2));
    return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
  })
app.listen(port,hostname,()=>{
    console.log('Express Server is started at ' + port)
})