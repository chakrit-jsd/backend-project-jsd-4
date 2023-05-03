const { Schema, model } = require('mongoose')
const { DateTime } = require('luxon')
const bcrypt = require('bcrypt')
const provincesThailand = require('../assets/data/provinceList')

const UsersSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: [true, 'err'],
    lowercase: true
  },
  password: {
    type: String,
    require: true
  },
  profilename: {
    type: String,
    max: 20
  },
  aboutme: {
    type: String,
    max: 200
  },
  interest: {
    type: String,
    enum: ['hiit', 'pilates', 'strength', 'weight', 'yoga']
  },
  weight: Number,
  height: Number,
  firstname: {
    type: String,
    require: true,
    min: 4,
    max: 20,
  },
  lastname: {
    type: String,
    require: true,
    min: 4,
    max: 20,
  },
  birthdate: {
    type: Date,
    require: true,
    get (date) {
      return DateTime.fromJSDate(date)
    }
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'none'
  },
  city: {
    type: String,
    enum: provincesThailand
  },

  profileImgUrl: {
    type: String,
    get (url) {
      if (!url) return 'https://via.placeholder.com/150'
      console.log(url)
      return url
    }
  },

  smallImgUrl: {
    type: String
  },

  following: [{ ref: 'Users', type: Schema.Types.ObjectId }],
  follower: [{ ref: 'Users', type: Schema.Types.ObjectId }],

  createAt: {
    type: Date,
    get (date) {
      return DateTime.fromJSDate(date)
    }
  },

  updateAt: {
    type: Date,
    get (date) {
      return DateTime.fromJSDate(date)
    }
  }

})

UsersSchema.virtual('posts', {
  ref: 'Cards',
  localField: '_id',
  foreignField: 'author'
})


const preSetPassword = async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUND)
  }
  next()
}

UsersSchema.pre('save', preSetPassword)
UsersSchema.pre('updateOne', preSetPassword)

UsersSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

module.exports = model('Users', UsersSchema)
