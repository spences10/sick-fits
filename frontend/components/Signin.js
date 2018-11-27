import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import From from './styles/form'
import Error from './errorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

class Signin extends React.Component {
  state = {
    email: '',
    name: '',
    password: ''
  }

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signin, { error, loading }) => (
          <From
            method="post"
            onSubmit={async e => {
              e.preventDefault()
              // TODO: custom error message for email
              // use the variable (res) to do that, for
              // now just await'ing the signin() function
              // const res = await signin()
              // console.log(res)
              await signin()
              this.setState({
                email: '',
                name: '',
                password: ''
              })
            }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign into your Account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Sign on In!</button>
            </fieldset>
          </From>
        )}
      </Mutation>
    )
  }
}

export default Signin
