const { Schema, model } = require('mongoose')
const { DateTime } = require('luxon')
const bcrypt = require('bcrypt')
const provincesThailand = require('../assets/data/provinceList')

const UsersSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true
  },
  aboutme: {
    type: String,
    max: 200
  },
  interest: {
    type: String,
    enum: ['Hiit', 'Pilates', 'Strength', 'Weight', 'Yoga']
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
  profilename: {
    type: String,
    max: 20
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
    default: 'other'
  },
  city: {
    type: String,
    enum: provincesThailand
  },
  profileImgUrl: {
    type: String,
    get (url) {
      if (!url) return 'https://via.placeholder.com/150'
      return url
    }
  },
  smallImgUrl: {
    type: String
  },
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

UsersSchema.virtual('following', {
  ref: 'Follow',
  localField: '_id',
  foreignField: 'author'
})

const followerOp = {
  ref: 'Follow',
  localField: '_id',
  foreignField: 'target'
}

UsersSchema.virtual('follower', followerOp)
UsersSchema.virtual('isFollowing', followerOp)

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
