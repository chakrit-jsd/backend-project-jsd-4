const Joi = require('joi')
const mongo = require("mongodb")


const mongoDBIdSchema = Joi.object({
  id: Joi
    .string()
    .custom(
      (value, helpers) => {
        // console.log(value)
        const filtered = mongo.ObjectId.isValid(value)
        // console.log(filtered)
        return !filtered ? helpers.error("any.invalid") : value;
      },
        "invalid objectId" )
    .required()
})


module.exports = mongoDBIdSchema
