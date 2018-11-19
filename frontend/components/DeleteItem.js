import React from 'react'

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
