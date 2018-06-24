import React, { Component } from 'react';
import {bindActionCreators} from "redux";

import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';

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

import { player } from '../actions';

const Root = styled(Flex)`
    width: 100%;
    overflow-x: auto;
`;

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

  challenge = (id) => {
    this.handleClose();
    this.props.challenge({ opponent: id});
  };

  render() {
    return (
      <Root flexDirection='column'>
        <Box m="auto" mt="15vh">
          <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding='dense'>Avatar</TableCell>
                    <TableCell padding='dense'>Username</TableCell>
                    <TableCell padding='dense'>Rank</TableCell>
                  <TableCell padding='dense'>Games Played</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.leaderboard.map(p => {
                    return (
                      <TableRow key={p._id}>
                        <TableCell padding='dense'>
                          <Avatar alt={p.username} src={p.photo} />
                        </TableCell>
                        <TableCell padding='dense'>
                          {p.username}
                        </TableCell>
                        <TableCell padding='dense'>{p.rank}</TableCell>
                        <TableCell padding='dense'>{p.gamesPlayed}</TableCell>
                        <TableCell padding='none'>
                            <IconButton
                              aria-label="More"
                              aria-owns={this.state.anchorEl ? 'long-menu' : null}
                              aria-haspopup="true"
                              data-id={p._id}
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
                              <MenuItem onClick={() => this.challenge(this.state.anchorEl.dataset.id)}>
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
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  leaderboard: state.leaderboard
});

const mapDispatchToProps = dispatch => bindActionCreators({
  challenge: player.challenge
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Leaderboard);
