const Joi = require('joi')
const provincesThailand = require('../../../assets/data/provinceList')

const userSchema = Joi.object({
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

  passwordConfirm: Joi
    .any()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'any.only': 'Confirm password not match'
    }),

  firstname: Joi
    .string()
    .required()
    .min(4)
    .max(20)
    .regex(/^[a-zA-Z\s]+$/)
    .messages({
      'string.pattern.base': 'First Name accept only a-z, A-Z'
    }),

  lastname: Joi
    .string()
    .required()
    .min(4)
    .max(20)
    .regex(/^[a-zA-Z\s]+$/)
    .messages({
      'string.pattern.base': 'Last Name accept only a-z, A-Z'
    }),

  birthdate: Joi
    .date()
    .required()
    .max(new Date())
    .messages({
      'date.max': 'Invalid Birth Date'
    }),

  gender: Joi
    .string()
    .valid('female', 'male', 'other')
    .messages({
      'any.only': 'Invalid Gender'
    }),

  city: Joi
    .string()
    .required()
    .valid(...provincesThailand)
    .messages({
      'any.only': 'Invalid City'
    }),

  profilename: Joi
    .string()
    .max(30)
    .trim(),

  aboutme: Joi
    .string()
    .max(200)
    .trim(),

  interest: Joi
    .string()
    .valid('hiit', 'pilates', 'strength', 'weight', 'yoga')
    .messages({
      'any.only': 'Invalid Activity'
    }),

  weight: Joi
    .number()
    .max(200)
    .positive(),

  height: Joi
    .number()
    .max(300)
    .positive(),

  file: Joi
    .string()

})


module.exports = userSchema
