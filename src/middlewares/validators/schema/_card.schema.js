const Joi = require('joi')

const cardSchema = Joi.object({
  title: Joi
    .string()
    .required()
    .max(50)
    .trim(),

  description: Joi
    .string()
    .required()
    .max(200)
    .trim(),

  activity: Joi
    .string()
    .required()
    .valid('hiit', 'pilates', 'strength', 'weight', 'yoga')
    .messages({
      'any.only': 'Invalid Activity'
    }),

  duration: Joi
    .number()
    .required()
    .min(10)
    .max(180)
    .positive(),

  file: Joi
    .any()
})


module.exports = cardSchema
