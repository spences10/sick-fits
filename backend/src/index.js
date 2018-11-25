const cookieParser = require('cookie-parser')

require('dotenv').config({ path: 'variables.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

server.express.use(cookieParser())

// use express middleware to populate current user
// decode JWT token to get user Id
server.express.use((req, res, next) => {
  const { token } = req.cookies
  console.log('=====================')
  console.log(token)
  console.log('=====================')
  next()
})

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(
      `Server is now running on http://localhost:${deets.port}`
    )
  }
)
