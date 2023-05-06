const Users = require('../../models/Users.schema')
const Follow = require('../../models/Follow.schema')

const postFollow = async (req, res, next) => {
  const resC = await Follow.create({
    author: '644e3c91b997cb1cbe5c02e7',
    target: '644fb21c737ad0885d33af54'
  })

  console.log(resC)

  res.status(201).json({message: 'Follwing Done'})
}

module.exports = {
  postFollow
}
