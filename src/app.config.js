const path = require('path')
const express = require('express')
const useRouters = require('./app.routes')
const appMiddlewares = require('./middlewares/app.middlewares')
const errorsHandle = require('./middlewares/errorHandle/errorsHandler')
const app = express()

app.use(appMiddlewares)
app.use('/public', express.static(path.join(__dirname, '../public')))

useRouters(app)

app.use(errorsHandle)

module.exports = app
