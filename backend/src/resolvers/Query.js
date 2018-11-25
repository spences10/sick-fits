const { forwardTo } = require('prisma-binding')

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check for current user Id
    if (!ctx.request.userId) {
      return null
    }
    // if they are logged in then return
    // the query for the user
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info // 👈 query from client side
    )
  }
}

module.exports = Query
