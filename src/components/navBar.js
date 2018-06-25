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
import MenuIcon from '@material-ui/icons/Menu';
import StarIcon from '@material-ui/icons/Stars';
import ChallengeIcon from '@material-ui/icons/ChatBubble';
import GameIcon from '@material-ui/icons/VideogameAsset';
import LogoutIcon from '@material-ui/icons/Lock';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const HeroText = styled.a`
    font-family: 'Montserrat';
    font-size: 2em;
    color: #fff;
    text-decoration: none;
`;

const Fab = styled.div`
  z-index: 100;
  position: fixed;
  bottom: 5vh;
  right: 5vh;
`

const pageLinks = [{label: 'Leaderboard', icon: (<StarIcon/>)}, {label:'Challenges', icon: (<ChallengeIcon/>) }, {label: 'Games', icon: (<GameIcon/>) }];

class NavBar extends Component {
  state = {
    drawer: false
  };

  toggleDrawer = (open) => () => {
    this.setState({
      drawer: open,
    });
  };

  pageListFragments = () => {
    return pageLinks.map(link =>
      <ListItem key={link.label} button onClick={() => this.props.changePage(link.label.toLowerCase())}>
        <ListItemIcon>
          {link.icon}
        </ListItemIcon>
        <ListItemText primary={link.label} />
      </ListItem>
    );
  };

  render() {
    return (
      <Flex>
        <AppBar position="static">
          <Toolbar>
            <Flex justifyContent='space-between'>
              <Box>
                <HeroText href="/">SSTK Tetris</HeroText>
              </Box>
            </Flex>
          </Toolbar>
        </AppBar>
        <Fab>
          <Button
            variant="fab" color="primary"
            aria-label="More"
            aria-owns={this.state.anchorEl ? 'long-menu' : null}
            aria-haspopup="true"
            onClick={this.toggleDrawer(true)}
          >
            <MenuIcon/>
          </Button>
          <Drawer
            anchor="bottom"
            open={this.state.drawer}
            onClose={this.toggleDrawer(false)}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
            >
              <List>
                {this.pageListFragments()}
              </List>
              <Divider/>
              <List>
                <ListItem button onClick={() => this.props.changePage('logout')}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </Fab>
      </Flex>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  display: state.display,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (page) => push(`/${page}`),
  togglePlayerDrawer: display.togglePlayerDrawer,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
