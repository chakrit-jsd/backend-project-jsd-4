const Cards = require("../../models/Cards.schema")
const Users = require("../../models/Users.schema")


const getFeedHome = async (req, res, next) => {

  try {
    await req.user.populate({
      path: 'posts',
      populate: [
        { path: 'author', select: 'profilename smallImgUrl' },
        { path: 'isLiked', match: { author: { $eq: req.user._id }}, select: 'author'},
        { path: 'likedCount'},
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
          if (ret.isLiked) {
            ret.isLiked = ret.isLiked.some((like) => {
              return like.author.equals(req.user._id)
            })
          }
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

const getFeedAll = async (req, res, next) => {
  try {
    await req.user.populate({path: 'following', select: 'target'})
    const arr = req.user.following.map((user) => {
      return user.target
    } )
    arr.push(req.user._id)
    // console.log(arr)
    const targetPost = await Cards.find({author: arr})
    .populate([
      { path: 'author', select: 'profilename smallImgUrl' },
      { path: 'isLiked', match: { author: { $eq: req.user._id }}, select: 'author'},
      { path: 'likedCount'},
    ])
    .sort({createAt: -1})

    const postsAll = []
    for (const post of targetPost) {
      const postObj = post.toObject({
        getters: true,
        transform: (doc, ret) => {
          if (ret.isLiked) {
            ret.isLiked = ret.isLiked.some((like) => {
              return like.author.equals(req.user._id)
            })
          }
          // console.log(ret)
          delete ret.id
          delete ret.__v
          return ret
      }})

      postsAll.push(postObj)
    }

    res.status(200).json({ posts: postsAll })

  } catch (error) {
    next(error)
  }
}

const getAnotherFeed = async (req, res, next) => {
  const userId = req.params.userId
  try {
    if (userId.length !== 24) throw {resError: [404, 'User Not Found']}
    const user = await Users.findById(userId)
    if (!user) throw {resError: [404, 'User Not Found']}

    await user.populate({
      path: 'posts',
      populate: [
        { path: 'author', select: 'profilename smallImgUrl' },
        { path: 'isLiked', match: { author: { $eq: req.user._id }}, select: 'author'},
        { path: 'likedCount'},
      ],
      options: {
        sort: { createAt: -1 },
      }
    })

    const posts = []
    for (const i of user.posts) {
      const ob = i.toObject({
        getters: true,
        transform: (doc, ret) => {
          if (ret.isLiked) {
            ret.isLiked = ret.isLiked.some((like) => {
              return like.author.equals(req.user._id)
            })
          }
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
  getFeedHome,
  getFeedAll,
  getAnotherFeed
}
