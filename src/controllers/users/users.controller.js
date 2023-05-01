const path = require('path')
const sharp = require('sharp')

const getMe = (req, res) => {
  // console.log(req.user)
  res.status(200).json({
    user: req.user
  })
}

const putProfileEdit = async (req, res, next) => {
  if (req.body.file) {
    console.log('sharp run')
    const imgData = req.body.file
    const urlNormal = `/public/profilenormal/${req.user._id}_normal.jpg`
    const urlSmall = `/public/profilesmall/${req.user._id}_small.jpg`
    const pathNormal = path.join(__dirname, `../../..${urlNormal}`)
    const pathSmall = path.join(__dirname, `../../..${urlSmall}`)

    await sharp(Buffer.from(imgData.split(',')[1], 'base64'))
      .resize(200, 200)
      .jpeg({ quality: 80 })
      .toFile(pathNormal)

    await sharp(pathNormal)
      .resize(40, 40)
      .jpeg({ quality: 90 })
      .toFile(pathSmall)

    req.user.profileImgUrl = process.env.SERVER_ORIGIN+urlNormal
    req.user.smallImgUrl = process.env.SERVER_ORIGIN+urlSmall

  }

    // console.log(process.env.SERVER_ORIGIN)

  for (const data in req.body) {
    if (data == 'profileImgUrl' || data == 'file') continue
    req.user[data] = req.body[data]
  }
  req.user.updateAt = Date.now()
  // console.log(req.user)
  try {
    const user = await req.user.save()
    console.log(user)
    res.status(201).json({user: user})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getMe,
  putProfileEdit
}
