const router = require('express').Router()
const register = require('../controllers/auth/register.controller')
const login = require('../controllers/auth/login.controller')
const checkLogin = require('../middlewares/checkLogin/checkLogin')

router.get('/login', checkLogin.plzLogout, login.getLogin)
router.post('/login', checkLogin.plzLogout, login.postLogin)

router.get('/register', checkLogin.plzLogout, register.getRegister)
router.post('/register', checkLogin.plzLogout, register.postRegister)

router.get('/logout', checkLogin.plzLogin, login.getLogout)


module.exports = router
