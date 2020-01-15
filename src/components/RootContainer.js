import React, { Component, Fragment } from 'react'
import { Container, CssBaseline } from '@material-ui/core';
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import theme from '../helper/theme'
import LobbyPage from './LobbyPage'
import LobbiesPage from './LobbiesPage'
import MainPage from './MainPage'
import PageNotFound from './PageNotFound'
import NickPage from './NickPage'
import { AUTH_TOKEN } from '../constant'
import { isTokenExpired } from '../helper/jwtHelper'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return token ? (
    <Route {...rest} render={matchProps => <Component {...matchProps} />} />
  ) : (
    <Redirect to="/nickname" />
  )
}

class RootContainer extends Component {
    constructor(props) {
        super(props)
        this.refreshTokenFn = this.refreshTokenFn.bind(this)

        this.state = {
        token: props.token,
        }
    }

    refreshTokenFn(data = {}) {
        const token = data[AUTH_TOKEN]

        if (token) {
            localStorage.setItem(AUTH_TOKEN, token)
        } else {
            localStorage.removeItem(AUTH_TOKEN)
        }

        this.setState({
            token: data[AUTH_TOKEN],
        })
    }

    // Load token into component state
    bootStrapData() {
        try {
            const token = localStorage.getItem(AUTH_TOKEN)

            if (token !== null && token !== undefined) {

                const expired = isTokenExpired(token)

                if (!expired) {
                    this.setState({ token: token })
                } else {
                    localStorage.removeItem(AUTH_TOKEN)
                    this.setState({ token: null })
                }
            }
        } catch (e) {
            console.log('')
        }
    }

    //verify localStorage check
    componentDidMount() {
        this.bootStrapData()
    }

    render() {
        return (
        <Router>
            <Fragment>
                {this.renderRoute()}
            </Fragment>
        </Router>
        )
    }

    renderRoute() {
        return (
          <div>
            <CssBaseline />
            <Container maxWidth="md" style={{ height: '100vh' }}>
                <Switch>
                <Route exact path="/" component={MainPage} />
                <ProtectedRoute
                    token={this.state.token}
                    path="/lobbies"
                    component={LobbiesPage}
                />
                <Route path="/lobby/:id" component={LobbyPage} />
                <Route
                    token={this.state.token}
                    path="/nickname"
                    render={props => <NickPage refreshTokenFn={this.refreshTokenFn} />}
                />
                <Route component={PageNotFound} />
                </Switch>
            </Container>
        </div>
        )
    }
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      name
    }
  }
`

export default graphql(ME_QUERY, {
  options: {
    errorPolicy: 'all',
  },
})(theme(RootContainer))