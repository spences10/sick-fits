import { createAuth } from '@keystone-next/auth'
import { config, createSchema } from '@keystone-next/keystone/schema'
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session'
import 'dotenv/config'
import { Product } from './schemas/product'
import { ProductImage } from './schemas/product-image'
import { User } from './schemas/user'
import { insertSeedData } from './seed-data'

const databaseURL = process.env.DATABASE_URL

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
})

export default withAuth(
  // @ts-ignore
  config({
    server: {
      cors: { origin: [process.env.FRONTEND_URL], credentials: true },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone)
        }
      },
    },
    lists: createSchema({ User, Product, ProductImage }),
    ui: {
      isAccessAllowed: ({ session }) => {
        return !!session?.data
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: `id`,
    }),
  })
)
