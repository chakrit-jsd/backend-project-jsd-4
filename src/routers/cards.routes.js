const router = require('express').Router()

router.post('/card/create')

router.put('/:cardId/like')
router.patch('/:cardId/edit')
router.delete('/:cardId/delete')

module.exports = router
