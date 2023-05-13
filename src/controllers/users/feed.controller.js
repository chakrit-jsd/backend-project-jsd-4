const Cards = require("../../models/Cards.schema")
const Users = require("../../models/Users.schema")


const getFeedHome = async (req, res, next) => {
  const page = req.params.page
  const limitPerpage = 3
  const data = {}

  try {
    await req.user.populate({
      path: 'posts',
      populate: [
        { path: 'author', select: 'profilename smallImgUrl' },
        { path: 'isLiked', match: { author: { $eq: req.user._id }}, select: 'author'},
        { path: 'likedCount'},
      ],
      options: {
        skip: limitPerpage * (page - 1),
        limit: limitPerpage,
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

    data.posts = posts

    if (posts.length !== limitPerpage) {
      data.next = false
    } else {
      data.next = true
    }

    res.status(200).json(data)

  } catch (error) {
    next(error)
  }
}

const getFeedAll = async (req, res, next) => {
  const page = req.params.page
  const limitPerpage = 3
  const data = {}

  try {
    await req.user.populate({path: 'following', select: 'target'})
    const arr = req.user.following.map((user) => {
      return user.target
    })
    arr.push(req.user._id)
    // console.log(arr)
    const targetPost = await Cards.find({author: arr})
    .populate([
      { path: 'author', select: 'profilename smallImgUrl' },
      { path: 'isLiked', match: { author: { $eq: req.user._id }}, select: 'author'},
      { path: 'likedCount'},
    ])
    .skip(limitPerpage * (page - 1))
    .limit(limitPerpage)
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

    data.posts = postsAll

    if (postsAll.length !== limitPerpage) {
      data.next = false
    } else {
      data.next = true
    }

    res.status(200).json(data)

  } catch (error) {
    next(error)
  }
}

const getAnotherFeed = async (req, res, next) => {
  const userId = req.params.userId
  const page = req.params.page
  const limitPerpage = 3
  const data = {}

  try {

    if (userId.length !== 24) throw {resError: [404, 'User Not Found']}

    if (req.user._id.equals(userId)) throw {resError: [307, 'Page Is Same Your Profile']}

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
        skip: limitPerpage * (page - 1),
        limit: limitPerpage,
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

    data.posts = posts

    if (posts.length !== limitPerpage) {
      data.next = false
    } else {
      data.next = true
    }

    res.status(200).json(data)

  } catch (error) {
    console.log(error)
    next(error)
  }
}


module.exports = {
  getFeedHome,
  getFeedAll,
  getAnotherFeed
}
