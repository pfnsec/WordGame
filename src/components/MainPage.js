import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'

class MainPage extends Component {
    state = {
        email: '',
        password: '',
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

const LOGIN_USER_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export default graphql(LOGIN_USER_MUTATION, { name: 'loginMutation' })(
  withRouter(MainPage),
)
