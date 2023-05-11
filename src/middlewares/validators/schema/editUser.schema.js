const Joi = require('joi')
const userSchema = require('./_user.schema')

const excludeSchema = Joi.object().keys({
  email: Joi.forbidden(),

  password: Joi.forbidden(),

  passwordConfirm: Joi.forbidden(),

}).unknown(false)


const editUserSchema = userSchema.concat(excludeSchema)

module.exports = editUserSchema
