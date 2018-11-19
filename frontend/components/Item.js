import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import formatMoney from '../lib/formatMoney'

import Title from './styles/title'
import ItemStyles from './styles/itemStyles'
import PriceTag from './styles/priceTag'
import DeleteItem from './DeleteItem'

class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }
  render() {
    const { item } = this.props
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link href={{ pathname: '/item', query: { id: item.id } }}>
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: 'update',
              query: { id: item.id }
            }}
          >
            <a>Edit ✏</a>
          </Link>
          <button>Add To Cart</button>
          <DeleteItem>Delete This Item</DeleteItem>
        </div>
      </ItemStyles>
    )
  }
}

export default Item
