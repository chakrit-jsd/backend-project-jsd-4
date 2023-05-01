const dotenv = require('dotenv')
const mongoAtlast = require('./src/databases/mongoAtlast')

dotenv.config()
const app = require('./src/app.config')
const { PORT } = process.env


// create server
const startServer = async () => {
  try {
    await mongoAtlast()
    require('./src/middlewares/passposts/usePassport')
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}/`)
    })
  } catch (error) {
    console.error(new Date(), error)
    process.exit(1)
  }
}

startServer()
