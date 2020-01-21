import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CommentIcon from '@material-ui/icons/Comment';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import NickToolbar from './NickToolbar'
import Footer from './Footer'
import Styles from './Styles'

import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'

class LobbiesPage extends Component {

    state = {
      nick: '',
      checked: false,
      lobbies: [],
    }

    constructor(props) {
      super(props);

      this.handleLobbyCreate = this.handleLobbyCreate.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLobbyCreate() {
      console.log(this.props.createLobby)
      this.props.createLobby({
        variables: { },
      }).then(data => {
        console.log(data)
        // Process your data as needed here:
        //setState({ data });
      }).catch(err => {
        console.log(err)
        console.error('Our Error: ', err)
      });
    }

    handleToggle() {

    }

    componentWillReceiveProps(nextProps) {
      if (this.props.location.key !== nextProps.location.key) {
        this.props.meQuery.refetch()
      }
    }

    render() {
        const { classes } = this.props;

        if (this.props.meQuery.loading) {
          //console.log(this.props.meQuery)
          return null
        } else {
          //console.log(this.props.meQuery)
          //this.setState({nick: this.props.meQuery.me.nick});
        }


        return (
            <React.Fragment>
              <NickToolbar/>
              <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                  <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                      Join a lobby!
                    </Typography>
                    <List className={classes.root}>
                        {[0, 1, 2, 3, 4, 5, 6].map(value => {
                          const labelId = `checkbox-list-label-${value}`;

                          return (
                            <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                              <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                  <CommentIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          );
                        })}
                    </List>
                  <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Or create a new one. We're not fussy.
                  </Typography>
                  <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                      <Grid item>
                        <Button variant="contained" color="primary" onClick={this.handleLobbyCreate}>
                          Create Lobby
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Container>
                </div>
              </main>
              {/* Footer */}
              {/* End footer */}
            </React.Fragment>
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

const CREATE_LOBBY_MUTATION = gql`
  mutation CreateLobbyMutation {
    createLobby {
      id
      started
      creator
      partner
      creator_word
      partner_word
      rounds
    }
  }
`

const LOBBIES_QUERY = gql`
  query LobbiesQuery {
    lobbies {
      id
      started
      creator
      partner
    }
  }
`

const ME_QUERY = gql`
  query MeQuery {
    me {
        id
        nick
    }
  }
`

export default compose(
    graphql(SUBMIT_TURN, { name: 'submitTurn' }),
    graphql(CREATE_LOBBY_MUTATION, { name: 'createLobby' }),
    graphql(LOBBIES_QUERY, { name: 'lobbiesQuery' }),
    graphql(ME_QUERY, { name: 'meQuery' }),
    withStyles(Styles),
  )(
    withRouter(LobbiesPage),
  )