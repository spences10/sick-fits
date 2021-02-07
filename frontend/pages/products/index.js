import { useRouter } from 'next/dist/client/router'
import Pagination from '../../components/pagination'
import Products from '../../components/products'

export default function OrderPage() {
  const { query } = useRouter()
  const page = parseInt(query.page)
  return (
    <div>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  )
}
