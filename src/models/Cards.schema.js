const { DateTime } = require('luxon')
const { Schema, model } = require('mongoose')

const CardsSchema = new Schema({
  author: {
    ref: 'Users',
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    max: 50,
    required: true
  },
  description: {
    type: String,
    max: 200
  },
  activity: {
    type: String,
    enum: ['Hiit', 'Pilates', 'Strength', 'Weight', 'Yoga'],
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  imgUrl: {
    type: String,
    require: true
  },
  dateactivity: {
    type: Date,
    require: true,
    get (date) {
      const d = DateTime.fromJSDate(date)
      return {
        date: date,
        dateFormat: DateTime.fromISO(d).toFormat('dd LLLL'),
      }
    }
  },

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

})

const LikedOption = {
  ref: 'Liked',
  localField: '_id',
  foreignField: 'target'
}

CardsSchema.virtual('liked', LikedOption)
CardsSchema.virtual('likedCount',
{
  ...LikedOption,
  count: true
})
CardsSchema.virtual('isLiked',LikedOption)

module.exports = model('Cards', CardsSchema)
