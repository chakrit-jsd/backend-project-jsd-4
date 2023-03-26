const router = require('express').Router()


router.post('/register', require('../controllers/postRegister'))


module.exports = router
