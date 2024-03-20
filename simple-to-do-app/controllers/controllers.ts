import { NextFunction } from 'express';
import express = require('express');
import Tasks from '../model/db';
import NotFound from '../errors/not_found';
import BadRequestError from '../errors/badrequest';
const post = (req:any,res:express.Response,next:NextFunction):void=>{
    const task = {...req.body,userId:req.userId}
    Tasks.create(task).then((data):void=>{
        if (data){
            res.status(201).json({taskId:data._id,title:data.title,description:data.description,completed:data.completed})
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
const get_by_id = (req:any,res:express.Response,next:NextFunction):void=>{
    Tasks.findOne({$and: [{_id:req.params.id},{userId:req.userId}]}).then((data):void=>{
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
    const task = {...req.body,userId:req.userId}
    Tasks.findOneAndUpdate({$and: [{_id:req.params.id},{userId:req.userId}]},task,{ returnOriginal: false }).then((data):void=>{
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
const delete_by_id = (req:any,res:express.Response,next:NextFunction):void=>{
    Tasks.findOneAndDelete({$and: [{_id:req.params.id},{userId:req.userId}]}).then((data):void=>{
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