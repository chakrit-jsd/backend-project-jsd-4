const mongoose = require('mongoose')

require('../models/Cards.schema')
require('../models/Follow.schema')
require('../models/Liked.schema')
require('../models/Users.schema')


module.exports = async () => {
  // mongoose.set('strictQuery', true)
  await mongoose.connect(process.env.MONGOATLAST)
}
