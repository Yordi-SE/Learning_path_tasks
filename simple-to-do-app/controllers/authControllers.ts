import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import config from '../jwt/auth.config';
import User from '../model/user';
import jwt from 'jsonwebtoken';
import BadRequestError from '../errors/badrequest';
import NotFound from '../errors/not_found';
const signup = (req:Request, res:Response,next:NextFunction):void => {
    User.findOne({username:req.body.username}).exec().then((data):void=>{
        if (data){
            throw new BadRequestError({message: "username already exists"})
        }
        else{
            User.create(req.body).then((data):void=>{
                if (data){
                    res.status(201).json({username:data.username})
                }
                else{
                    throw new BadRequestError({message: "some field is missing"})
                }
            }).catch((error)=>{ 
                next(error)
            })
        }
    }).catch((error)=>{
        next(error)
    })

}
const signin = (req:Request, res:Response,next:NextFunction):void => {
    User.findOne({username:req.body.username}).exec().then((data):void=>{
        if (data){
            const passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
            if (!passwordIsValid) {
                throw new BadRequestError({message: "Invalid Password!"})
            }
            const token = jwt.sign({ id: data._id }, config.secret, {
                algorithm:"HS256",allowInsecureKeySizes:true,expiresIn: 86400
            });
            res.status(200).json({token: token });
        }
        else{
            throw new NotFound({message: "User Not found"})
        }
    }
    ).catch((error)=>{
        next(error);
    })  

}
export { signup,  signin}
