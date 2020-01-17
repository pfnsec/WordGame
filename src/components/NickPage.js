import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

class NickPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nick: '',
    }

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
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
  

  render() {
    //var classes = this.useStyles();
    const { classes } = this.props;


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BrushOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          First, set your nickname!
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nickname"
            label="What should we call you?"
            name="nickname"
            autoComplete="nickname"
            autoFocus
            onChange={ this.handleChange }
            value={this.state.nick}
          />
          {/*
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => { this._setnick(); console.log('onClick'); }} 
          >
            Yup looks good
          </Button>
          {/*
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          */}
        </form>
      </div>
      <Box mt={8}>
        <this.Copyright />
      </Box>
    </Container>
  );
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({nick: event.target.value});
  }

  render_old() {
    return (
        <Grid container spacing={3}>

            <Grid item xs={9} xl={9}>
                <TextField 
                id="standard-full-width"

                label="Nickname" />
            </Grid>

            <Grid item xs={3}>
                <Button variant="contained" color="primary"
                onClick={() => { this._setnick(); console.log('onClick'); }} >
                   Submit 
                </Button>
            </Grid>
      </Grid> 
    )
  }

  _setnick = async e => {
    const { nick } = this.state
    this.props
      .nickMutation({
        variables: {
          nick,
        },
      })
      .then(result => {
        console.log(result.data)
        const token = result.data.setNick.token

        this.props.refreshTokenFn &&
          this.props.refreshTokenFn({
            [AUTH_TOKEN]: token,
          })
        this.props.history.replace('/')
        window.location.reload()
      })
      .catch(err => {
        console.log('error', err)
      })
  }
}

/*
NickPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
*/


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

export default compose(
    withStyles(styles),
    graphql(NICK_MUTATION, { name: 'nickMutation' }),
  )(
    withRouter(NickPage),
  )
