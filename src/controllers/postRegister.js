const Users = require('../models/Users')

module.exports = async (req, res) => {
  const user = await Users.create(req.body)
  res.send(user)
}
