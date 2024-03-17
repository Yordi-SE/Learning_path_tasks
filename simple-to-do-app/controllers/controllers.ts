import { NextFunction } from 'express';
import express = require('express');
import Tasks from '../model/db';
import joi = require('joi');
import NotFound from '../errors/not_found';
import BadRequestError from '../errors/badrequest';
import schema from '../joi_validation/validation';
import ValidationError from '../errors/validation';
import IdSchema from '../joi_validation/route_params';


const post = (req:any,res:express.Response,next:NextFunction):void=>{
    const validation:joi.ValidationResult = schema.validate(req.body)
    if (validation.error){
        throw new ValidationError({message: validation.error.details[0].message})
    }
    const task = {...req.body,userId:req.userId}
    Tasks.create(task).then((data):void=>{
        if (data){
            res.status(201).json({taskId:task._id,title:task.title,description:task.description,completed:task.completed})
        }
        else{
            throw new BadRequestError({message: "some field is missing"})
        }
    }).catch((error)=>{
        next(error)
    })
}
const get_all = (req:any,res:express.Response,next:NextFunction):void=>{
    Tasks.find({userId:req.userId}).then((data:any):void=>{
        if (data){
            res.json(data.map((task:any)=>{return {taskId:task._id,title:task.title,description:task.description,completed:task.completed}}))
        }
        else{
            throw new NotFound({message: "task not found"})
        }
    }).catch((error)=>{
        next(error)
    })

}
const get_by_id = (req:express.Request,res:express.Response,next:NextFunction):void=>{
    const validation:joi.ValidationResult = IdSchema.validate(req.params)
    if (validation.error){
        throw new ValidationError({message: validation.error.details[0].message})
    }
    Tasks.findById(req.params.id).then((data):void=>{
        if (data){
            res.json({taskId:data._id,title:data.title,description:data.description,completed:data.completed})
        }
        else{
            throw new NotFound({message: "task not found"})
        }
    }).catch((error)=>{
        next(error)
    })
}
const put = (req:any,res:express.Response,next:NextFunction):void=>{
    const idValidation:joi.ValidationResult = IdSchema.validate(req.params)
    if (idValidation.error){
        throw new ValidationError({message: idValidation.error.details[0].message})
    }
    const validation:joi.ValidationResult = schema.validate(req.body)
    if (validation.error){
        throw new ValidationError({message: validation.error.details[0].message})
    }
    const task = {...req.body,userId:req.userId}
    Tasks.findByIdAndUpdate(req.params.id,task,{ new: true }).then((data):void=>{
        if (data){
            res.json({taskId:data._id,title:data.title,description:data.description,completed:data.completed})
        }
        else{
            throw new NotFound({message: "task not found"})
        }
    }).catch((error)=>{
        next(error)
    })
}
const delete_by_id = (req:express.Request,res:express.Response,next:NextFunction):void=>{
    const validation:joi.ValidationResult = IdSchema.validate(req.params)
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