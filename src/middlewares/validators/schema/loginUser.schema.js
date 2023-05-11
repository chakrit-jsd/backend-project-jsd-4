const Joi = require("joi")


const loginUserSchema = Joi.object({
  email: Joi
    .string()
    .required()
    .min(6)
    .max(30)
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/)
    .trim()
    .messages({
      'string.pattern.base': 'Invalid Email Pattern'
    }),

  password: Joi
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required()
    .min(8)
    .max(30)
    .trim()
    .messages({
      'string.pattern.base': 'Invalid Password Pattern'
    }),
  })


  module.exports = loginUserSchema
