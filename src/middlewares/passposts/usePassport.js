const passport = require('passport')
const local = require('./strategies/local.strategy')
const Users = require('../../models/Users.schema')

passport.use(local)

passport.serializeUser((user, next) => {
  console.log('serial')
  next(null, user._id)
})

passport.deserializeUser(async (id, next) => {
  try {
    // console.log('deserial')
    const user = await Users.findById(id)
    // if (user) console.log('user')
    if (!user) throw {resError : [404, 'User Not Found c-pass']}
    if(!id) return console.log('not IDDDD')
    // console.log('ssssssssssssssssss', user)
    next(null, user)
  } catch (error) {
    next(error)
  }
})
