import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import theme from '../utils/theme';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const FormTab = styled(Box)`
  min-width: 52vw;
  margin: 0 20px;
  
  & > div > div, button {
    width: 100%;
    margin: auto;
  }
  button {
    margin-bottom: 3vh;
  }
`;

const LobbyTab = styled(Box)`
  min-width: 52vw;
  max-width: 90vw;
  overflow-x: scroll;
  
  @media (min-width: ${theme.scrollWidth}px) {
    ::-webkit-scrollbar {
      width: 0px;
    }
  }
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class Leaderboard extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <Flex flexDirection='column'>
        <Box m="auto" mt="15vh" style={{maxWidth: '100vw'}}>
          <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Avatar</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Rank</TableCell>
                  <TableCell>Games Played</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.leaderboard.map(p => {
                    return (
                      <TableRow key={p._id}>
                        <TableCell component="th" scope="row">
                          <Avatar alt={p.username} src={p.photo} />
                        </TableCell>
                        <TableCell>
                          {p.username}
                        </TableCell>
                        <TableCell>{p.rank}</TableCell>
                        <TableCell>{p.gamesPlayed}</TableCell>
                        <TableCell>
                            <IconButton
                              aria-label="More"
                              aria-owns={this.state.anchorEl ? 'long-menu' : null}
                              aria-haspopup="true"
                              onClick={this.handleClick}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={this.state.anchorEl}
                              open={Boolean(this.state.anchorEl)}
                              onClose={this.handleClose}
                            >
                              <MenuItem onClick={this.handleClose}>
                                Challenge
                              </MenuItem>
                              <MenuItem onClick={this.handleClose}>
                                View Stats
                              </MenuItem>
                            </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
          </Paper>
        </Box>
      </Flex>
    );
  }
}

const mapStateToProps = state => ({
  leaderboard: state.leaderboard
});

export default connect(
  mapStateToProps,
  null,
)(Leaderboard);
