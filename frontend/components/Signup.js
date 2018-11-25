import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import From from './styles/form'
import Error from './errorMessage'

class Signup extends React.Component {
  render() {
    return (
      <React.Fragment>
        <From>
          <fieldset>
            <h2>Sign Up for an Account</h2>
          </fieldset>
        </From>
      </React.Fragment>
    )
  }
}

export default Signup
