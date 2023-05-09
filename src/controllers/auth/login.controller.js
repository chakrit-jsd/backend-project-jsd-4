const passport = require("passport")

const getLogin = (req, res) => {
  console.log('get')
  res.status(200).end()
}

const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    console.log('login')
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

const getLogout = (req, res) => {
  req.logout((err) => {
    if (err) throw err
    res.status(200).json({message: 'Logout Success'})
  })
}

module.exports = {
  getLogin,
  postLogin,
  getLogout
}
