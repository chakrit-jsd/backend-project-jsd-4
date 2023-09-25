const express = require('express')
const cors = require('cors')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const ms = require('ms')
const useRedisConnect = require('../databases/redis')

const sessionOptions = {
  store: useRedisConnect,
  secret: process.env.SECRET_KEY,
  cookie: {
//    domain: process.env.CLIENT_ORIGIN,
    httpOnly: true,
    secure: true,
    maxAge: ms('7d'),
    sameSite: 'none'
  },
  rolling: true,
  saveUninitialized: false,
  resave: false
}

if (process.env.PRODUCTION !== 'isProd') {
  sessionOptions.cookie = {
      httpOnly: true,
      maxAge: ms('7d')
    }
  }

const appMiddlewares = express()

appMiddlewares.use(cors({
	origin: true,
	credentials: true,
  // exposedHeaders: 'Set-Cookie'
}))

// console.log(process.env.CLIENT_ORIGIN)
// content-type urlencoded and JSON
appMiddlewares.use(compression())
appMiddlewares.use(express.urlencoded({ extended: true }))
appMiddlewares.use(express.json({ limit: '11mb'}))
appMiddlewares.use(cookieParser())

appMiddlewares.use(session(sessionOptions))

appMiddlewares.use(passport.initialize())

// appMiddlewares.use(require('body-parser').urlencoded({ extended: true }))
appMiddlewares.use(passport.session())

// appMiddlewares.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   // res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

module.exports = appMiddlewares
