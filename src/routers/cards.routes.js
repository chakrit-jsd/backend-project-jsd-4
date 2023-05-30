const router = require('express').Router()
const cards = require('../controllers/cards/cards.controller')
const liked = require('../controllers/cards/liked.controllers')
const { validateBody, validateParams } = require('../middlewares/validators/validators')
const editCardSchema = require('../middlewares/validators/schema/editCard.schema')
const cardSchema = require('../middlewares/validators/schema/_card.schema')
const idSchema = require('../middlewares/validators/schema/mongoDBId.schema')

router.post('/create', validateBody(cardSchema), cards.postCreateCards)
router.put('/edit', validateBody(editCardSchema), cards.putEditCards)
router.delete('/delete/:cardId', validateParams(idSchema), cards.deleteCards)

router.post('/liked', validateParams(idSchema), liked.postLiked)
router.get('/liked/:cardId', validateParams(idSchema), liked.whoLikedCard)

module.exports = router
