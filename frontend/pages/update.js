import UpdateProduct from '../components/update-product'

export default function UpdatePage({ query }) {
  console.log(query)
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  )
}
