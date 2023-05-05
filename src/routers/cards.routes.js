const router = require('express').Router()
const cards = require('../controllers/cards/cards.controller')

router.post('/create', cards.postCreateCards)
router.put('/edit', cards.putEditCards)
router.delete('/delete/:cardId', cards.deleteCards)

router.put('/:cardId/like')

module.exports = router
