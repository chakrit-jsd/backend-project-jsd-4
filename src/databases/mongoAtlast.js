const mongoose = require('mongoose')

module.exports = async () => {
  mongoose.set('strictQuery', true)
  await mongoose.connect(process.env.MONGOATLAST)
}
