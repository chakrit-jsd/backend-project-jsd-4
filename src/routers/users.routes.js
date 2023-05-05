const router = require('express').Router()
const users = require('../controllers/users/users.controller')
const feeds = require('../controllers/users/feed.controller')

router.get('/', users.getMe)
router.get('/feed/gethome', feeds.getFeedHome)
router.get('/feed/getall')

router.put('/profile/edit', users.putProfileEdit)

module.exports = router
