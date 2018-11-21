import SingleItem from '../components/SingleItem'

const Item = props => {
  return (
    <React.Fragment>
      <SingleItem id={props.query.id} />
    </React.Fragment>
  )
}

export default Item
