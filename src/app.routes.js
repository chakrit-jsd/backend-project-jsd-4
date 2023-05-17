const { getUsersBySearch } = require('./controllers/users/search.controller')
const checkLogin = require('./middlewares/checkLogin/checkLogin')

module.exports = (app) => {

  app.use('/api', require('./routers/auth.routes'))

  app.use('/api/users', checkLogin.plzLogin, require('./routers/users.routes'))

  app.use('/api/cards', checkLogin.plzLogin, require('./routers/cards.routes'))

  app.use('/api/search', checkLogin.plzLogin, getUsersBySearch)

}
