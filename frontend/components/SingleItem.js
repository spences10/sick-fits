import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import Head from 'next/head'
import Error from './errorMessage'

const SingleItemStyle = styled.div`
  min-width: 1200px;
  margin: 2ren auto;
  box-shadow: ${({ theme }) => theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
`

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
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {(error, loading, data) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          if (!data.item)
            return <p>No item found for {this.props.id}</p>
          const item = data.item
          return (
            <SingleItemStyle>
              <Head>Sick Fits! | {item.title}</Head>
              <img src={item.largeImage} alt={item.title} />
            </SingleItemStyle>
          )
        }}
      </Query>
    )
  }
}

export default SingleItem
