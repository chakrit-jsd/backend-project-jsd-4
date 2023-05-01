const Users = require('../../models/Users.schema')

const getRegister = async (req, res) => {
  res.status(200).end()
}

const postRegister = async (req, res, next) => {

  try {
    req.body.createAt = Date.now()
    const user = await Users.create(req.body)
    if (!user) return next([])
    return res.status(201).json({
      message: `Register ${user.email} Success`
    })

  } catch (error) {
    if (error._message) {
      return next({resError: [422, error._message]})
    }
    if (error.code === 11000) {
      return next({resError: [409, `This ${req.body.email} is already registered`]})
    }
    next(error)
  }
}

module.exports = {
  postRegister,
  getRegister
}
