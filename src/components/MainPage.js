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
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  toolbarButtons: {
    marginLeft: "auto",
    marginRight: 0,
    overflow: "hidden"
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});


class MainPage extends Component {
    state = {
      nick: ''
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.location.key !== nextProps.location.key) {
        this.props.meQuery.refetch()
      }
    }


    Copyright() {
      return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            Word-Game
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
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
                  {/* End hero unit */}
                  {/*
                  <Grid container spacing={4}>
                    {this.cards.map(card => (
                      <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                          <CardMedia
                            className={classes.cardMedia}
                            image="https://source.unsplash.com/random"
                            title="Image title"
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                              Heading
                            </Typography>
                            <Typography>
                              This is a media card. You can use this section to describe the content.
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" color="primary">
                              View
                            </Button>
                            <Button size="small" color="primary">
                              Edit
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                    */}
                </Container>
              </main>
              {/* Footer */}
              <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                  Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                  What are you waiting for?
                </Typography>
                <this.Copyright />
              </footer>
              {/* End footer */}
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
    withStyles(styles),
    graphql(ME_QUERY, { name: 'meQuery' }),
  )(
  withRouter(MainPage),
)
