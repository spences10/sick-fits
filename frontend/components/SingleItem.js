import React from 'react'
import gql from 'graphql-tag'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`

class SingleItem extends React.Component {
  render() {
    return (
      <React.Fragment>
        <p>Single Item Component</p>
      </React.Fragment>
    )
  }
}

export default SingleItem
