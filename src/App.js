import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import constants from './constants';

import Home from './containers/home';
import LoggedOut from './containers/loggedOut';
import Challenges from './containers/challenges';
import Games from './containers/games';

import NavBar from './components/navBar';
import SnackBar from './components/snackBar';
import PlayDialog from './components/playDialog';

const loggedInOnlyPaths = [
  'leaderboard',
  'challenges',
  'games'
];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!!nextProps.player.id !== prevState.loggedIn) {
      if (!prevState.loggedIn && !loggedInOnlyPaths.find(path => nextProps.location.pathname.includes(path))) {
        nextProps.loggedIn();

      }
      if (!nextProps.player.id) {
        nextProps.loggedOut();
        return { loggedIn: false };
      }
      return { loggedIn: !prevState.loggedIn };
    } else if (Object.keys(nextProps.player).length > 0) {
      return { loggedIn: true };
    }
    return prevState;
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.props.player.id
        && this.props.location
        && this.props.location.pathname !== '/logged-out') {
        this.props.loggedOut();
        location.reload(); // eslint-disable-line
      }
    },600);
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? <div><NavBar /></div> : null}
        <main>
          <Route exact path="/leaderboard" component={Home} />
          <Route exact path="/logged-out" component={LoggedOut} />
          <Route exact path="/challenges" component={Challenges} />
          <Route exact path="/games" component={Games} />
          <Route path="/login" component={() => { window.location = `//${constants.serverUrl}/auth/google`; }} />
          <Route path="/logout" component={() => { window.location = `//${constants.serverUrl}/logout`; }} />
        </main>
        <PlayDialog/>
        <SnackBar/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
  player: state.player,
  location: state.routing.location,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loggedOut: () => push('/logged-out'),
  loggedIn: () => push('/leaderboard'),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
