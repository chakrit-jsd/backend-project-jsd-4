const router = require('express').Router()
const cards = require('../controllers/cards/cards.controller')
const liked = require('../controllers/cards/liked.controllers')

router.post('/create', cards.postCreateCards)
router.put('/edit', cards.putEditCards)
router.delete('/delete/:cardId', cards.deleteCards)

router.post('/liked', liked.postLiked)

module.exports = router
