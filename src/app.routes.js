const { getUsersBySearch } = require('./controllers/users/search.controller')
const checkLogin = require('./middlewares/checkLogin/checkLogin')
const jwt = require('jsonwebtoken');

module.exports = (app) => {

  app.use('/api', require('./routers/auth.routes'))

  app.use('/api/users', checkLogin.plzLogin, require('./routers/users.routes'))

  app.use('/api/cards', checkLogin.plzLogin, require('./routers/cards.routes'))

  app.use('/api/search', checkLogin.plzLogin, getUsersBySearch)

  app.use('/api/getuser', async (req, res) => {
    const user = req.user
    if (!user) {
      return res.status(404).json({ 'error': 'User Not Found'})
    }
    const showName = user.profilename ? user.profilename : user.firstname

    console.log(user)
    const token = jwt.sign({ id: user._id, showName }, process.env.JWT_SECRET, { expiresIn: '30s' })
    return await res.status(200).json({ token })
  })
}
