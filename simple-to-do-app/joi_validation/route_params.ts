import Joi from 'joi';
const IdSchema = Joi.object().keys({
    id: Joi.string().length(24).hex().required()
})
export default IdSchema