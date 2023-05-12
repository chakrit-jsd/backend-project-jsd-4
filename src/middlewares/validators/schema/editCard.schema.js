const Joi = require('joi')
const mongo = require("mongodb")

const editCardSchema = Joi.object({
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

  dateactivity: Joi
    .date()
    .required()
    .max(new Date())
    .messages({
      'date.max': 'Invalid Date'
    }),

  file: Joi
    .any(),

  cardId: Joi
  .string()
  .custom(
    (value, helpers) => {
      console.log(value)
      const filtered = mongo.ObjectId.isValid(value)
      console.log(filtered)
      return !filtered ? helpers.error("any.invalid") : value;
    },
      "invalid objectId" )
  .required()

})


module.exports = editCardSchema
