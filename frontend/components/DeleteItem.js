import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { ALL_ITEMS_QUERY } from './Items'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

class DeleteItem extends React.Component {
  update = (cache, payload) => {
    // manually update the cache
    // so it matches the server
    // read the cache
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY })
    console.log('=====================')
    console.log(data)
    console.log('=====================')
    // filter for deleted id
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    )
    // put items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data })
  }
  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure? Delete, right?')) {
                deleteItem()
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    )
  }
}

export default DeleteItem
