const Users = require('../../models/Users.schema')
const path = require('path')
const sharp = require('sharp')

const getMe = async (req, res, next) => {
  // console.log(req.user)
  try {
    await req.user.populate([
      {
        path: 'following',
        populate: {
            path: 'target',
            select: 'profilename firstname lastname smallImgUrl'
        },
        select: 'target'
      },
      {
        path: 'follower',
        populate: {
          path: 'author',
          select: 'profilename firstname lastname smallImgUrl'
        },
        select: 'author'
      }
    ])

    const data = req.user.toObject({
      virtuals: true,
      transform: (doc, ret) => {
        if (ret.isFollowing) {
          ret.isFollowing = ret.isFollowing.some((follow) => {
            return follow.author.equals(req.user._id)
          })
        }
        delete ret.password
        delete ret.id
        delete ret.__v
        delete ret.createAt
        delete ret.updateAt
        return ret
      }
    })

    res.status(200).json({ user: data })

  } catch (error) {
    next(error)
  }
}

const getAnother = async (req, res, next) => {
  const userId = req.params.userId
  try {

    if (userId.length !== 24) throw {resError: [404, 'User Not Found']}

    if (req.user._id.equals(userId)) throw {resError: [307, 'Page Is Same Your Profile']}

    const user = await Users.findById(userId)
      .populate([{
          path: 'following',
          populate: {
              path: 'target',
              select: 'profilename firstname lastname smallImgUrl'
          },
          select: 'target'
        },
        {
          path: 'follower',
          populate: {
            path: 'author',
            select: 'profilename firstname lastname smallImgUrl'
          },
          select: 'author'
        },
        {
          path: 'isFollowing',
          match: { author: { $eq: req.user._id } },
          select: 'author'
        }
      ])

    if (!user) throw {resError: [404, 'User Not Found']}
    const data = user.toObject({
      virtuals: true,
      transform: (doc, ret) => {
        if (ret.isFollowing) {
          ret.isFollowing = ret.isFollowing.some((follow) => {
            return follow.author.equals(req.user._id)
          })
        }
        delete ret.password
        delete ret.id
        delete ret.__v
        delete ret.createAt
        delete ret.updateAt
        return ret
      }
    })

    data.thisme = {
      _id: req.user._id,
      profilename: req.user.profilename || `${req.user.firstname}  ${req.user.lastname}`,
      smallImgUrl: req.user.smallImgUrl
    }
    // console.log(data.follower[0].author)
    res.status(200).json({ user: data })
  } catch (error) {
    next(error)
  }
}

const putProfileEdit = async (req, res, next) => {
  if (req.body.file) {
    // console.log('sharp run')
    const imgData = req.body.file
    const urlNormal = `/public/profilenormal/${req.user._id}_normal.jpg`
    const urlSmall = `/public/profilesmall/${req.user._id}_small.jpg`
    const pathNormal = path.join(__dirname, `../../..${urlNormal}`)
    const pathSmall = path.join(__dirname, `../../..${urlSmall}`)

    await sharp(Buffer.from(imgData.split(',')[1], 'base64'))
      .resize(300, 300)
      .jpeg({ quality: 90 })
      .toFile(pathNormal)

    await sharp(pathNormal)
      .resize(40, 40)
      .jpeg({ quality: 90 })
      .toFile(pathSmall)

    req.user.profileImgUrl = process.env.SERVER_ORIGIN+urlNormal
    req.user.smallImgUrl = process.env.SERVER_ORIGIN+urlSmall

  }

  for (const data in req.body) {
    if (data == 'profileImgUrl' || data == 'file') continue
    req.user[data] = req.body[data]
  }
  req.user.updateAt = Date.now()
  // console.log(req.user)
  try {
    const user = await req.user.save()
    // console.log(user)
    res.status(201).json({user: user})
  } catch (error) {
    next(error)
  }
}

const getDashboard = async (req, res, next) => {
  let userId = req.params.userId
  if (userId === 'me') {
    userId = req.user._id
  }
  try {
    const userInfo = await Users.findById(userId).populate({path: 'posts', select: 'activity duration'})
    const allActivity = userInfo.posts
    const dashboard = {}
    const genDashboardData = (obj) => {
      if (dashboard[obj.activity]?.count === undefined || dashboard[obj.activity].timeSpent === undefined) {
        dashboard[obj.activity] = {count: 0, timeSpent: 0}
      }
      dashboard[obj.activity] = {
        count: dashboard[obj.activity].count + 1,
        timeSpent: dashboard[obj.activity].timeSpent + obj.duration
      }
    }

    function toHoursAndMinutes(totalMinutes) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return { hours, minutes };
    }

    let totalTimeSpent = 0
    for (const activity of allActivity) {
      genDashboardData(activity)
      totalTimeSpent += activity.duration
    }
    for (const activity in dashboard) {
      dashboard[activity].percentage = ((dashboard[activity].timeSpent / totalTimeSpent) * 100).toFixed(0)
      dashboard[activity].timeSpent = toHoursAndMinutes(dashboard[activity].timeSpent)
    }
    dashboard.totalTimeSpent = totalTimeSpent

    // console.log(totalTimeSpent)
    // console.log(dashboard)
    res.status(200).json({dashboard: dashboard})
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  const userId = req.params.userId
  try {
    const user = await Users.findById(userId)
    return res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getMe,
  getAnother,
  putProfileEdit,
  getDashboard,
  getUserById,
}
