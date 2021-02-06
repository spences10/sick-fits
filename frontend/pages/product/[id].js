import SingleProduct from '../../components/single-product'

export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />
}
