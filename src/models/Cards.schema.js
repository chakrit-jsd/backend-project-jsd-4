const { Schema, model } = require('mongoose')

const CardsSchema = new Schema({
  author: {
    ref: 'Users',
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    max: 50
  },
  description: {
    type: String,
    max: 200
  },
  activity: {
    type: String,
    enum: ['hiit', 'pilates', 'strength', 'weight', 'yoga'],
    required: true
  },
  duration: {
    type: Number
  },

  liked: [{ ref: 'Users', type: Schema.Types.ObjectId }],

  createAt: {
    type: Date,
    get (date) {
      const ceateDate = DateTime.fromJSDate(date)
      return {
        date: ceateDate,
        duration: DateTime.now().diff(ceateDate, ['years', 'days', 'hours', 'minutes']).toObject()
      }
    }
  },

  updateAt: {
    type: Date,
    get (date) {
      return DateTime.fromJSDate(date)
    }
  }

}, { timestamps: true })


module.exports = model('Cards', CardsSchema)
