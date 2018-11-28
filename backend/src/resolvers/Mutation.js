const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    )

    // verbose logging, uncomment below
    // console.log(item)

    return item
  },
  updateItem(parent, args, ctx, info) {
    // take a copy of the updates
    const updates = { ...args }
    // remove ID from there
    delete updates.id
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    )
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }
    // find the item
    const item = await ctx.db.query.item({ where }, `{id title}`)
    // check if user owns the item
    // TODO:
    // delete it
    return ctx.db.mutation.deleteItem({ where }, info)
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase()
    // has the password
    const password = await bcrypt.hash(args.password, 10)
    // create user in database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] }
        }
      },
      info
    ) // create the user JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.APP_SECRET
    )
    // set JWT as cookie, on the response!
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // one year
    })
    // return the user
    return user
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. Check if there's a user with that email
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }
    // 2. Check if password is correct
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password yo!')
    }
    // 3. Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.APP_SECRET
    )
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // one year
    })
    // 5. return the user
    return user
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token')
    return { message: 'Goodbye!' }
  }
}

module.exports = Mutations
