import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

class DeleteItem extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button>{this.props.children}</button>
      </React.Fragment>
    )
  }
}

export default DeleteItem
