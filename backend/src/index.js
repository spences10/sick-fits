const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

require('dotenv').config({ path: 'variables.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

server.express.use(cookieParser())

// use express middleware to populate current user
// decode JWT token to get user Id
server.express.use((req, res, next) => {
  const { token } = req.cookies
  // if logged in get user Id from token
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    // add user Id into req
    req.userId = userId
  }
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
