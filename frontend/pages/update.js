import UpdateItem from '../components/UpdateItem'

const Update = ({ query }) => {
  return (
    <React.Fragment>
      <UpdateItem id={query.id} />
    </React.Fragment>
  )
}

export default Update
