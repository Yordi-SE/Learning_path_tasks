import joi = require('joi');
const schema = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    completed: joi.boolean().required()
})
export default schema