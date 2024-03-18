import joi = require('joi');
import express = require('express');
import ValidationError from '../errors/validation';
const IdSchema = joi.object().keys({
    id: joi.string().length(24).hex().required()
})
const validate_param = (req:any,res:express.Response,next:express.NextFunction):void=>{
    const validation:joi.ValidationResult = IdSchema.validate(req.params)
    if (validation.error){
        throw new ValidationError({message: validation.error.details[0].message})
    }
    next()
}
export default validate_param