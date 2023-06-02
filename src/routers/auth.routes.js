const router = require('express').Router()
const register = require('../controllers/auth/register.controller')
const login = require('../controllers/auth/login.controller')
const checkLogin = require('../middlewares/checkLogin/checkLogin')
const { validateBody } = require('../middlewares/validators/validators')
const userSchema = require('../middlewares/validators/schema/_user.schema')
const loginUserSchema = require('../middlewares/validators/schema/loginUser.schema')



router.get('/login', checkLogin.plzLogout, login.getLogin)
router.post('/login', [checkLogin.plzLogout, validateBody(loginUserSchema)], login.postLogin)
router.get('/login/slack', login.getSlackLogin)
router.get('/login/slack/callback', login.getSlackLoginCb)


router.get('/register', checkLogin.plzLogout, register.getRegister)
router.post('/register', [checkLogin.plzLogout, validateBody(userSchema)], register.postRegister)

router.get('/logout', checkLogin.plzLogin, login.getLogout)


module.exports = router
