const Users = require('../../models/Users.schema')
const Follows = require('../../models/Follow.schema')

const postFollow = async (req, res, next) => {

  try {
    const followDel = await Follows.findOneAndDelete({
      author: req.user._id,
      target: req.body.userId
    })
    // console.log(followDel)
    if (followDel) return res.status(200).json({message: 'Unfollowing'})

    const followCreate = await Follows.create({
      author: req.user._id,
      target: req.body.userId
    })

    res.status(201).json({message: 'Following'})

  } catch (error) {
    next(error)
  }
}

module.exports = {
  postFollow
}
