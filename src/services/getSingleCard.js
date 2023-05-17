const getCard = async (card, userId) => {
  await card.populate([
    { path: 'author', select: 'profilename smallImgUrl' },
    { path: 'isLiked', match: { author: { $eq: userId }}, select: 'author'},
    { path: 'likedCount'}
  ])
  const post = card.toObject({
    getters: true,
    transform: (doc, ret) => {
      if (ret.isLiked) {
        ret.isLiked = ret.isLiked.some((like) => {
          return like.author.equals(userId)
        })
      }
      delete ret.id
      delete ret.__v
      return ret
  }})

  return post
}

module.exports = getCard
