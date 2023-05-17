const { getUsersBySearch } = require('./controllers/users/search.controller')
const checkLogin = require('./middlewares/checkLogin/checkLogin')

module.exports = (app) => {

  app.use('/', require('./routers/auth.routes'))

  app.use('/users', checkLogin.plzLogin, require('./routers/users.routes'))

  app.use('/cards', checkLogin.plzLogin, require('./routers/cards.routes'))

  app.use('/search', checkLogin.plzLogin, getUsersBySearch)

}
