import React, { Component } from 'react'
import { Button, TextField, Grid, Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'

class NickPage extends Component {
  state = {
    nick: '',
  }

  render() {
    return (
        <Grid container spacing={3}>

            <Grid item xs={9} xl={9}>
                <TextField 
                id="standard-full-width"

                label="Nickname" />
            </Grid>

            <Grid item xs={3}>
                <Button variant="contained" color="primary">
                   Submit 
                </Button>
            </Grid>
      </Grid> 
    )
  }
}

const NICK_MUTATION = gql`
  mutation NickMutation($nick: String!) {
    setNick(nick: $nick) {
      token
      user {
        id
        nick
      }
    }
  }
`

export default graphql(NICK_MUTATION, { name: 'nickMutation' })(
  withRouter(NickPage),
)