const passport = require("passport")

const getLogin = (req, res) => {
  // console.log('get')
  res.status(200).end()
}

const postLogin = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, (err, user) => {
    // console.log('login', user)

    if (err) {
      return next(err)
    }
 //   if(strategy === 'slack') {
//       console.log(req.sessionId)
//       req.logIn(user, (err) => {
//         console.log(err)
//         return res.redirect('https://nestfit.life')
//       })
//     }
    req.login(user, (err) => {

      if (err) {
        return next(err)
      }
       if(strategy === 'slack') {
        return res.redirect('https://nestfit.life')
       }
      console.log(req.user)
      res.status(200).json({message: 'Login Success'})
    })
  })(req, res, next)
}

const getSlackLogin = (req, res, next) => {
  console.log('slack get')
  passport.authenticate('slack')
}
const getSlackLoginCb = (req, res, next) => {
  console.log('slack get 2')
  passport.authenticate('slack', (err, user) => {
    console.log('au 2')
    console.log(typeof user)
    res.status(302).redirect(`${process.env.CLIENT_ORIGIN}/me`)
  })(req, res, next)
}


const getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) next(err)
    res.status(200).json({message: 'Logout Success'})
  })
}

module.exports = {
  getLogin,
  postLogin,
  getSlackLogin,
  getSlackLoginCb,
  getLogout
}
