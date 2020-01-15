import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'

class LobbyPage extends Component {
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
const SUBMIT_TURN = gql`
  mutation SubmitTurnMutation($word: String!, $lobby: ID!) {
    submitTurn(word: $word, lobby: $lobby) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

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

export default compose(
    graphql(SUBMIT_TURN, { name: 'submitTurn' }),
    graphql(LOGIN_USER_MUTATION, { name: 'loginMutation' })
  )(
    withRouter(LobbyPage),
  )
