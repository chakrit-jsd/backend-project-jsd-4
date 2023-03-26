const app = require('./src/express')
const dotenv = require('dotenv')
const mongoAtlast = require('./src/databases/mongoAtlast')

dotenv.config()
const { PORT } = process.env


//test get method
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      timestamp: new Date()
    }
  })
})

//test post method accept JSON
app.post('/', (req, res) => {
  if (req.body) {
    console.log(req.body.password)
  }
  res.send('Done')
})


// create server
const startServer = async () => {
  try {
    await mongoAtlast()
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}/`)
    })
  } catch (error) {
    console.error(new Date(), error)
    process.exit(1)
  }
}

startServer()
