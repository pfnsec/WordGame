import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Styles from './Styles'
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Footer from './Footer'

import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'


class MainPage extends Component {
    state = {
      nick: ''
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.location.key !== nextProps.location.key) {
        this.props.meQuery.refetch()
      }
    }




    cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


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
              <CssBaseline />
              <AppBar position="relative">
                <Toolbar>
                  <CameraIcon className={classes.icon} />
                  <Typography variant="h6" color="inherit" noWrap>
                    
                  </Typography>
                  <span className={classes.toolbarButtons}>
                  <Typography variant="h6" color="inherit" align="right" noWrap>
                    {this.props.meQuery.me.nick} 
                  </Typography>
                  </span>
                </Toolbar>
              </AppBar>
              <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                  <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                      What is this?
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                      It's simple, right? 
                      <br/> <br/> 
                      All you gotta do is <b>guess what your opponent is gonna say next!</b>
                      <br/><br/>
                      If you both say the same thing, you both win!
                    </Typography>
                    <div className={classes.heroButtons}>
                      <Grid container spacing={2} justify="center">
                        <Grid item>
                          <Button variant="contained" color="primary" href="lobbies">
                            Let's do this!
                          </Button>
                        </Grid>
                        {/*
                        <Grid item>
                          <Button variant="outlined" color="primary">
                            Secondary action
                          </Button>
                        </Grid>
                        */}
                      </Grid>
                    </div>
                  </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                </Container>
              </main>
              <Footer/>
            </React.Fragment>
          )
    }
}

const ME_QUERY = gql`
  query MeQuery {
    me {
        id
        nick
    }
  }
`

export default compose(
    graphql(ME_QUERY, { name: 'meQuery' }),
    withStyles(Styles),
  )(
  withRouter(MainPage),
)
