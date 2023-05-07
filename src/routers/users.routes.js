const router = require('express').Router()
const users = require('../controllers/users/users.controller')
const feeds = require('../controllers/users/feed.controller')
const follows = require('../controllers/users/follow.controller')

router.get('/', users.getMe)
router.get('/another/:userId', users.getAnother)
router.get('/another/:userId/feed', feeds.getAnotherFeed)

router.get('/feed/gethome', feeds.getFeedHome)
router.get('/feed/getall', feeds.getFeedAll)

router.post('/follows', follows.postFollow)

router.put('/profile/edit', users.putProfileEdit)

module.exports = router
