import React, { Component, Fragment } from 'react'

import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Styles'

import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'

class NickToolbar extends Component {

    componentWillReceiveProps(nextProps) {
      if (this.props.location.key !== nextProps.location.key) {
        this.props.meQuery.refetch()
      }
    }

    render() {
    
        const { classes } = this.props;

        if (this.props.meQuery.loading) {
          console.log(this.props.meQuery)
          return null
        } else {
          console.log(this.props.meQuery)
          //this.setState({nick: this.props.meQuery.me.nick});
        }

        return (
            <Fragment>
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
            </Fragment>
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
    withRouter,
  )(
    NickToolbar
  )