import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import From from './styles/form'
import Error from './errorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`

class Signup extends React.Component {
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
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signup, { error, loading }) => (
          <From
            method="post"
            onSubmit={async e => {
              e.preventDefault()
              // TODO: custom error message for email
              // use the variable (res) to do that, for
              // now just await'ing the signup() function
              // const res = await signup()
              // console.log(res)
              await signup()
              this.setState({
                email: '',
                name: '',
                password: ''
              })
            }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for an Account</h2>
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
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
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
              <button type="submit">Sign on Up!</button>
            </fieldset>
          </From>
        )}
      </Mutation>
    )
  }
}

export default Signup