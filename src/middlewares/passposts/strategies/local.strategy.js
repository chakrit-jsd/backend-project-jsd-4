const { Strategy } = require('passport-local')
const Users = require('../../../models/Users.schema')

const localStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
}, async (email, password, next) => {
  try {
    const user = await Users.findOne({ email })
    if (!user) {
      throw {resError: [404, 'Email Not Found']}
    }
    await user.comparePassword(password)
    next(null, user)
  } catch (error) {
    next(error)
  }
})

module.exports = localStrategy
