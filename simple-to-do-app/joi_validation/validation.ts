import joi = require('joi');
import express = require('express');
import { NextFunction } from 'express';
import ValidationError from '../errors/validation';
const schema = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    completed: joi.boolean().required()
})
const validate_task = (req:any,res:express.Response,next:NextFunction):void=>{
    const validation:joi.ValidationResult = schema.validate(req.body)
    if (validation.error){
        throw new ValidationError({message: validation.error.details[0].message})
    }
    next()
}

export default validate_task