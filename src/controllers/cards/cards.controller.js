const Cards = require('../../models/Cards.schema')
const Liked = require('../../models/Liked.schema')
const getCard = require('../../services/getSingleCard')
const path = require('path')
const sharp = require('sharp')
const fs = require('fs')

const postCreateCards = async (req, res, next) => {

  if (!req.body.file) {
    return next({resError : [422, 'Please Input Image']})
  }

  const imgData = req.body.file
  const urlImg = `/public/cardsactivity/${req.user._id}-${Date.now()}.jpg`
  const pathImg = path.join(__dirname, `../../..${urlImg}`)

  try {
    await sharp(Buffer.from(imgData.split(',')[1], 'base64'))
      .resize(600, 600)
      .jpeg({ quality: 90 })
      .toFile(pathImg)

    const card = await Cards.create({
      author: req.user._id,
      title: req.body.title,
      description: req.body.description,
      activity: req.body.activity,
      duration: req.body.duration,
      dateactivity: req.body.dateactivity,
      imgUrl: process.env.SERVER_ORIGIN + urlImg,
      createAt: Date.now()
    })

    const post = await getCard(card, req.user._id)

    res.status(201).json({ post: post })

  } catch (error) {
    next(error)
  }
}

const putEditCards = async (req, res, next) => {

  try {
    const card = await Cards.findById(req.body.cardId)

    if(!card || !card.author.equals(req.user._id)) {
      throw {resError: [404, 'Card Activity Not Found']}
    }

    if (req.body.file) {
      const imgData = req.body.file
      const urlImg = `/public/cardsactivity/${req.user._id}-${Date.now()}.jpg`
      const pathImg = path.join(__dirname, `../../..${urlImg}`)
      await sharp(Buffer.from(imgData.split(',')[1], 'base64'))
        .resize(600, 600)
        .jpeg({ quality: 90 })
        .toFile(pathImg)

      const delUrl = card.imgUrl.replace(process.env.SERVER_ORIGIN, '')
      const delPath = path.join(__dirname, `../../..${delUrl}`)
      // ระวังอย่าใส่ path unlink มั่วซั่ว
      await fs.promises.unlink(delPath)
      // ระวังอย่าใส่ path unlink มั่วซั่ว

      card.imgUrl = process.env.SERVER_ORIGIN + urlImg
    }

    card.title = req.body.title
    card.description = req.body.description
    card.activity = req.body.activity
    card.duration = req.body.duration
    card.dateactivity = req.body.dateactivity
    card.updateAt = Date.now()

    await card.save()

    const post = await getCard(card, req.user._id)

    res.status(201).json({ post: post})

  } catch (error) {
    next(error)
  }
}

const deleteCards = async (req, res, next) => {
  try {
    const card = await Cards
      .findOneAndDelete({
         _id: req.params.cardId,
         author: req.user._id
      })

    if(!card) {
      throw {resError: [404, 'Card Activity Not Found']}
    }

    await Liked.deleteMany({ target: card._id })

    const delUrl = card.imgUrl.replace(process.env.SERVER_ORIGIN, '')
    const delPath = path.join(__dirname, `../../..${delUrl}`)
    // ระวังอย่าใส่ path unlink มั่วซั่ว
    await fs.promises.unlink(delPath)
    // ระวังอย่าใส่ path unlink มั่วซั่ว

    res.status(200).json({ post: { _id : card._id } })

  } catch (error) {

    next(error)
  }

}


module.exports = {
  postCreateCards,
  putEditCards,
  deleteCards
}
