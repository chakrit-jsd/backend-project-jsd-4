const users = require('../controllers/users/users.controller')

const router = require('express').Router()

router.get('/', users.getMe)
router.get('/feed/gethome')
router.get('/feed/getall')

router.put('/profile/edit', users.putProfileEdit)

module.exports = router
