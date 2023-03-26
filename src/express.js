const express = require('express')
const router = require('./routers/user')

const app = express()

// content-type urlencoded and JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

module.exports = app
