const Cards = require('../../models/Cards.schema')
const Liked = require('../../models/Liked.schema')
const getCard = require('../../services/getSingleCard')


const postLiked = async (req, res, next) => {

  try {
    const card = await Cards.findById(req.body.cardId)

    if (!card) throw {resError: [404, 'Activity Not Found']}

    const isLiked = await Liked.findOneAndDelete({
      author: req.user._id,
      target: req.body.cardId
    })


    if (isLiked) {
      const post = await getCard(card, req.user._id)

      return res.status(200).json({ post: post })
    }

    const liked = await Liked.create({
      author: req.user._id,
      target: req.body.cardId
    })

    if (liked) {
      const post = await getCard(card, req.user._id)

      return res.status(201).json({ post: post })
    }

  } catch (error) {
    next(error)
  }
}

const whoLikedCard = async (req, res, next) => {
  // console.log(req.params.cardId)
  try {
    const card = await Cards
      .findById(req.params.cardId)
      .populate({
        path: 'liked',
        populate:
        { path: 'author', select: 'profilename firstname lastname smallImgUrl' }
      })

    const whoLiked = []
    for (const who of card.liked) {
      whoLiked.push(who.author)
    }

    // console.log(whoLiked)
    res.status(200).json({ whoLiked: whoLiked })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  postLiked,
  whoLikedCard
}
