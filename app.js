const app = require('./src/express')
const dotenv = require('dotenv')

dotenv.config()
const { PORT } = process.env

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      timestamp: new Date()
    }
  })
})

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}/`)
    })
  } catch (error) {
    console.error(new Date(), error)
    process.exit(1)
  }
}

startServer()
