// const LocalStrategy = require('passport-local').Strategy
// const Users = require('../../../models/Users.schema')

// const localStrategy = new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   session: true
// }, async (email, password, next) => {
//   try {
//     const user = await Users.findOne({ email })
//     if (!user) {
//       throw {resError: [404, 'Email Not Found']}
//     }
//     const result = await user.comparePassword(password)
//     if (!result) {
//       throw {resError: [404, 'Password Incorrect']}
//     }
//     console.log("errrrrrrr")
//     console.log(user)
//     next(null, user)
//   } catch (error) {
//     console.log("errrrrrrr")
//     next(error)
//   }
// })

// module.exports = localStrategy
