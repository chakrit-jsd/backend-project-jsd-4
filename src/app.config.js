const path = require('path')
const express = require('express')
const useRouters = require('./app.routes')
const appMiddlewares = require('./middlewares/app.middlewares')
const errorsHandle = require('./middlewares/errorHandle/errorsHandler')

const app = express()


// usePassport
app.set('trust proxy', true)
app.use('/api/public', express.static(path.join(__dirname, '../public')))
require('./middlewares/passposts/usePassport')
app.use(appMiddlewares)

useRouters(app)

app.use(errorsHandle)

module.exports = app
