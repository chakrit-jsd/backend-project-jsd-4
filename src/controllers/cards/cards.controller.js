const Cards = require('../../models/Cards.schema')
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
      imgUrl: process.env.SERVER_ORIGIN + urlImg,
      createAt: Date.now()
    })
    console.log(card)

    res.status(201).json({message: 'Create Activity Success'})

  } catch (error) {
    next(error)
  }
}

const putEditCards = async (req, res, next) => {
  // console.log(req.body)
  try {
    const card = await Cards.findById(req.body.cardId)
    // console.log(!card.author.equals('644fb21c737ad0885d33af54'))
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
    card.updateAt = Date.now()

    const cardRes = await card.save()

    if (!cardRes) throw new Error()

    res.status(201).json({message: 'Edit Activity Success'})

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
    // console.log(card)
    if(!card) {
      throw {resError: [404, 'Card Activity Not Found']}
    }

    const delUrl = card.imgUrl.replace(process.env.SERVER_ORIGIN, '')
    const delPath = path.join(__dirname, `../../..${delUrl}`)
    // ระวังอย่าใส่ path unlink มั่วซั่ว
    await fs.promises.unlink(delPath)
    // ระวังอย่าใส่ path unlink มั่วซั่ว

    res.status(200).json({message: 'Activity Deleted!'})

  } catch (error) {
    next(error)
  }

}


module.exports = {
  postCreateCards,
  putEditCards,
  deleteCards
}
