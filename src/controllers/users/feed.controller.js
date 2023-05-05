const getFeedHome = async (req, res, next) => {

  try {
    await req.user.populate({
      path: 'posts',
      populate: [
        { path: 'likedCount'},
        { path: 'author', select: 'profilename smallImgUrl' }
      ],
      options: {
        sort: { createAt: -1 },
      }
    })

    const p = req.user.posts

    const posts = []
    for (const i of p) {
      const ob = i.toObject({
        getters: true,
        transform: (doc, ret) => {
          delete ret.id
          delete ret.__v
          return ret
      }})
      posts.push(ob)
    }

    res.status(200).json({ posts: posts })

  } catch (error) {
    next(error)
  }

}


module.exports = {
  getFeedHome
}
