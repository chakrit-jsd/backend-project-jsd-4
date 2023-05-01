const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const ms = require('ms')

const { createClient } = require('redis')
const client = createClient({ url: process.env.REDIS_SERVER })

client.connect().catch(console.error)

const RedisStore = require('connect-redis').default

const useRedisConnect = new RedisStore({ client })

const sessionOptions = {
  store: useRedisConnect,
  secret: process.env.SECRET_KEY,
  cookie: {
    httpOnly: true,
    // secure: isProd,
    maxAge: ms('7d'),
    // sameSite: 'none'
  },
  rolling: true,
  saveUninitialized: false,
  resave: false
}

const appMiddlewares = express()

appMiddlewares.use(cors({
  origin: true,
  credentials: true
}))
console.log(process.env.CLIENT_ORIGIN)
// content-type urlencoded and JSON
appMiddlewares.use(express.urlencoded({ extended: true }))
appMiddlewares.use(express.json({ limit: '11mb'}))
appMiddlewares.use(session(sessionOptions))
appMiddlewares.use(passport.initialize())
appMiddlewares.use(passport.session())
// appMiddlewares.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
//   res.header('Access-Control-Allow-Credentials', 'true')
//   next()
// })


module.exports = appMiddlewares