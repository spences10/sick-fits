import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/form'
import Error from './errorMessage'

import formatMoney from '../lib/formatMoney'

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

class UpdateItem extends React.Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  }

  handleChange = e => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: val
    })
  }

  render() {
    return (
      <Mutation
        mutation={UPDATE_ITEM_MUTATION}
        variables={this.state}
      >
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // stop the form from submitting
              e.preventDefault()
              // call the mutation ✨✨✨✨
              const res = await createItem()
              // change to item page
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id }
              })
              console.log('=====================')
              console.log(res)
              console.log('=====================')
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price "
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter a Description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default UpdateItem
export { UPDATE_ITEM_MUTATION }
