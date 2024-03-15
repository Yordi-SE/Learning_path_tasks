import express, { NextFunction } from 'express';
import Tasks from '../model/db';
import Joi from 'joi';
import NotFound from '../errors/not_found';
import BadRequestError from '../errors/badrequest';
import schema from '../joi_validation/validation';
import ValidationError from '../errors/validation';
import IdSchema from '../joi_validation/route_params';


const post = (req:express.Request,res:express.Response,next:NextFunction):void=>{
    const validation:Joi.ValidationResult = schema.validate(req.body)
    if (validation.error){
        throw new ValidationError({message: validation.error.details[0].message})
    }
    Tasks.create(req.body).then((data):void=>{
        if (data){
            res.status(201).json(data)
        }
        else{
            throw new BadRequestError({message: "some field is missing"})
        }
    }).catch((error)=>{
        next(error)
    })
}
const get_all = (req:express.Request,res:express.Response,next:NextFunction):void=>{
    Tasks.find().then((data):void=>{
        if (data){
            res.json(data)
        }
        else{
            throw new NotFound({message: "task not found"})
        }
    }).catch((error)=>{
        next(error)
    })

}
const get_by_id = (req:express.Request,res:express.Response,next:NextFunction):void=>{
    const validation:Joi.ValidationResult = IdSchema.validate(req.params)
    if (validation.error){
        throw new ValidationError({message: validation.error.details[0].message})
    }
    Tasks.findById(req.params.id).then((data):void=>{
        if (data){
            res.json(data)
        }
        else{
            throw new NotFound({message: "task not found"})
        }
    }).catch((error)=>{
        next(error)
    })
}
const put = (req:express.Request,res:express.Response,next:NextFunction):void=>{
    const idValidation:Joi.ValidationResult = IdSchema.validate(req.params)
    if (idValidation.error){
        throw new ValidationError({message: idValidation.error.details[0].message})
    }
    const validation:Joi.ValidationResult = schema.validate(req.body)
    if (validation.error){
        throw new ValidationError({message: validation.error.details[0].message})
    }
    Tasks.findByIdAndUpdate(req.params.id,req.body,{ new: true }).then((data):void=>{
        if (data){
            res.json(data)
        }
        else{
            throw new NotFound({message: "task not found"})
        }
    }).catch((error)=>{
        next(error)
    })
}
const delete_by_id = (req:express.Request,res:express.Response,next:NextFunction):void=>{
    const validation:Joi.ValidationResult = IdSchema.validate(req.params)
    if (validation.error){
        throw new ValidationError({message: validation.error.details[0].message})
    }
    Tasks.findByIdAndDelete(req.params.id).then((data):void=>{
        if (data){
            res.status(204).send()
        }
        else{
            throw new NotFound({message: "task not found"})
        }
        
    }).catch((error)=>{
        next(error)
    })
}
export default {
    post: post,
    get_all: get_all,
    get_by_id: get_by_id,
    put:put,
    delete_by_id:delete_by_id
}