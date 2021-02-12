import { graphQLSchemaExtension } from '@keystone-next/keystone/schema'
import addToCart from './add-to-cart'

// make a fake graphql tagged template literal
const graphql = String.raw
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
      checkout(token: String!): Order
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
})
