const passport = require("passport")

const getLogin = (req, res) => {
  // console.log('get')
  res.status(200).end()
}

const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    // console.log('login')
    if (err) {
      return next(err)
    }
    req.login(user, (err) => {
      if (err) {
        return next(err)
      }
      res.status(200).json({message: 'Login Success'})
    })
  })(req, res, next)
}

const getSlackLogin = (req, res, next) => {
  console.log('slack get')
  passport.authenticate('slack', (err, user) => {

    res.status(200).json({message: 'slack 1'})
  })(req, res, next)
}
const getSlackLoginCb = (req, res, next) => {
  console.log('slack get 2')
  passport.authenticate('slack', (err, user) => {
    console.log('au 2')
    console.log(user)
    res.status(200).json({ message: 'au 2 succ'})
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
