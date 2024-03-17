import joi = require('joi');
const schema = joi.object().keys({
    username: joi.string().required().min(3),
    password: joi.string().required().min(5)
})
export default schema;