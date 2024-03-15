import Joi from 'joi'
const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    completed: Joi.boolean().required()
})
export default schema