const { Schema, model } = require('mongoose')

const LikedSchema = new Schema({
  author: {
    ref: 'Users',
    type: Schema.Types.ObjectId,
    require: true
  },
  target: {
    ref: 'Cards',
    type: Schema.Types.ObjectId,
    require: true
  }
}, { timestamps: true })


module.exports = model('Liked', LikedSchema)
