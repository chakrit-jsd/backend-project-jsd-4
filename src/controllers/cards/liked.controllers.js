const Cards = require('../../models/Cards.schema')
const Liked = require('../../models/Liked.schema')


const postLiked = async (req, res, next) => {
  try {
    const card = await Cards.findById(req.body.cardId)

    if (!card) throw {resError: [404, 'Activity Not Found']}

    const isLiked = await Liked.findOneAndDelete({
      author: req.user._id,
      target: req.body.cardId
    })

    // console.log('disliked', isLiked)

    if (isLiked) {
      return res.status(200).json({ message: 'Disliked' })
    }

    const liked = await Liked.create({
      author: req.user._id,
      target: req.body.cardId
    })

    // console.log('Liked', liked)

    res.status(201).json({ message: 'Liked' })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  postLiked
}
