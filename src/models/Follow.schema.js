const { Schema, model } = require('mongoose')

const FollowSchema = new Schema({
  author: {
    ref: 'Users',
    type: Schema.Types.ObjectId,
    require: true
  },
  target: {
    ref: 'Users',
    type: Schema.Types.ObjectId,
    require: true
  }
}, { timestamps: true })


module.exports = model('Follow', FollowSchema)
