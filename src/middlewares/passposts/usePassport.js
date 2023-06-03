const passport = require('passport')
const Users = require('../../models/Users.schema')
const SlackStrategy = require('passport-slack').Strategy
// const LocalStrategy = require('passport-local').Strategy
// const localStrategy = require('./strategies/local.strategy')
// const slackStrategy = require('./strategies/slack.stategy')
const { SLACK_CLIENT_ID, SCACK_CLIENT_SECRET, SLACK_CALLBACK } = process.env
// passport.use('local', new LocalStrategy({
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

//     return next(null, user)
//   } catch (error) {
//     return next(error)
//   }
// }))

passport.use(new SlackStrategy({
  clientID: SLACK_CLIENT_ID,
  clientSecret: SCACK_CLIENT_SECRET,
  callbackURL: SLACK_CALLBACK,
  skipUserProfile: false,
  passReqToCallback: true,
  scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team']
}, async (req, accessToken, refreshToken, params, profile, done) => {
    try {
      const user = await Users.findOne({ email: profile.user.email })

      if (!user) {
        const userCreate = await Users.create({
          email: profile.user.email,
          firstname: profile.displayName,
          profilename: profile.displayName,
          profileImgUrl: profile.user.image_192,
          smallImgUrl: profile.user.image_32,
          auth: { 'slack': { id: profile.id }},
          createAt: Date.now()
        })
        // console.log(userCreate)
        return done(null, userCreate)
      }
      if(user && !user.auth.slack) {
        user.auth.slack = { id: profile.id }
        await user.save()
      }
      done(null, user)


    } catch (error) {
      done(error)
    }
  }))
// passport.use('local', localStrategy)
// passport.use('slack', slackStrategy)

passport.serializeUser((user, next) => {
  // console.log('serial')
  return next(null, user._id)
})

passport.deserializeUser(async (id, next) => {
  try {
    // console.log('deserial')
    const user = await Users.findById(id)
    // if (user) console.log('user')
    if (!user) throw {resError : [404, 'User Not Found c-pass']}
    if (!id) return console.log('not IDDDD')
    // console.log('ssssssssssssssssss', user)
    next(null, user)
  } catch (error) {
    next(error)
  }
})
