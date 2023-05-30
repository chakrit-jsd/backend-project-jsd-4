const router = require('express').Router()
const users = require('../controllers/users/users.controller')
const feeds = require('../controllers/users/feed.controller')
const follows = require('../controllers/users/follow.controller')
const { validateBody, validateParams } = require('../middlewares/validators/validators')
const userSchema = require('../middlewares/validators/schema/_user.schema')
const editUserSchema = require('../middlewares/validators/schema/editUser.schema')
const idSchema = require('../middlewares/validators/schema/mongoDBId.schema')

router.get('/', users.getMe)
router.get('/another/:userId', validateParams(idSchema), users.getAnother)
router.get('/dashboard/:userId', users.getDashboard)
router.get('/another/:userId/feed/:page', validateParams(idSchema), feeds.getAnotherFeed)

router.get('/feed/gethome/:page', feeds.getFeedHome)
router.get('/feed/getall/:page', feeds.getFeedAll)

router.post('/follows', follows.postFollow)

router.put('/profile/edit', validateBody(editUserSchema), users.putProfileEdit)


module.exports = router
