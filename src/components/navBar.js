import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { display } from '../actions';
import { push } from 'react-router-redux';

import ReactCountdownClock from 'react-countdown-clock';

const HeroText = styled.a`
    font-family: 'Montserrat';
    font-size: 2em;
    color: #fff;
    text-decoration: none;
`;

const ActionWrapper = styled(Box)`
  .react-countdown-clock {
    position: fixed;
    right: 25px;
    top: 90px;
  }
`;

class NavBar extends Component {
  render() {
    const buttons = [];
    buttons.push(<Button key='view-players' onClick={() => this.props.togglePlayerDrawer()} color="inherit">View Players</Button>);
    buttons.push(<Button key='logout' href="/logout" color="inherit">Logout</Button>);
    return (
      <AppBar position="static">
        <Toolbar>
          <Flex w='100%' justifyContent='space-between'>
            <Box>
              <HeroText href="/">SSTK Tetris</HeroText>
            </Box>
            <ActionWrapper mt='10px'>
              {buttons}
            </ActionWrapper>
          </Flex>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  display: state.display,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us'),
  togglePlayerDrawer: display.togglePlayerDrawer,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
