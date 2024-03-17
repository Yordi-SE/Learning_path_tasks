import jwt from 'jsonwebtoken';
import config from './auth.config';
import e, { NextFunction, Request, Response } from 'express';
import User from '../model/user';
import BadRequestError from '../errors/badrequest';
const verifyToken = (req:any, res:Response, next:NextFunction):void => {
    let token = req.headers["x-access-token"] as string;
    if (!token) {
        throw new BadRequestError({code:403,message: "No token provided!"});
    }
    jwt.verify(token, config.secret, (err, decoded):void => {
        if (err) {
            throw new BadRequestError({code:401,message: "Unauthorized!"});
        }
        if (decoded){
            req.userId = (decoded as any).id;
        }
        next();

    });


}
export default verifyToken;