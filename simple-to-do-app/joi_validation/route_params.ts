import joi = require('joi');
const IdSchema = joi.object().keys({
    id: joi.string().length(24).hex().required()
})
export default IdSchema