import React from 'react'
import Header from './Header'
import Meta from './Meta'

class Page extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Meta />
        <Header />
        {this.props.children}
      </React.Fragment>
    )
  }
}

export default Page
