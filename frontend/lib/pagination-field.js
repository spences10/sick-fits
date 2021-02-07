import { PAGINATION_QUERY } from '../components/pagination'

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY })
      const count = data?._allProductsMeta?.count
      const page = skip / first + 1
      const pages = Math.ceil(count / first)

      // Check for existing items
      const items = existing.slice(skip, skip + first).filter(x => x)

      if (items.length && items.length !== first && page === pages) {
        return items
      }
      if (items.length !== first) {
        // no items, go to the network to fetch them
        return false
      }

      // If there are items, return them from the cache
      if (items.length) {
        return items
      }

      return false // fallback to network
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args
      // This runs when the Apollo client comes back from the network with the product
      const merged = existing ? existing.slice(0) : []
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip]
      }
      console.log(merged)
      // Finally return the merged items from the cache
      return merged
    },
  }
}
