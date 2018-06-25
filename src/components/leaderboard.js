import React, { Component } from 'react';
import {bindActionCreators} from "redux";

import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TablePagination from '@material-ui/core/TablePagination'

import EnhancedTableHead from './enchanedTableHead';

import { player } from '../actions';

const Root = styled(Flex)`
  width: 100%;
  overflow-x: auto;
  table {
    display: table-caption !important;
    th {
      padding-right: 0.8vw !important;
    }
  }
`;

const columnData = [
  { id: 'avatar', numeric: false, sortable: false, label: 'Avatar' },
  { id: 'username', numeric: false, sortable: true, label: 'Username' },
  { id: 'rank', numeric: true, sortable: true, label: 'Rank (Elo)' },
  { id: 'gamesPlayed', numeric: true, sortable: true, label: 'Games Played' },
];

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: 'rank',
      page: 0,
      rowsPerPage: 5,
      anchorEl: null,
    };
  }

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

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { order, orderBy, rowsPerPage, page } = this.state;

    return (
      <Root flexDirection='column'>
        <Box m="auto" mt="15vh">
          <Paper>
              <Table>
                <EnhancedTableHead
                  columns={columnData}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={this.props.leaderboard.length}
                />
                <TableBody>
                  {this.props.leaderboard
                    .sort(getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(p => {
                    return (
                      <TableRow key={p._id}>
                        <TableCell padding='dense'>
                          <Avatar src={p.photo} />
                        </TableCell>
                        <TableCell padding='dense'>
                          {p.username}
                        </TableCell>
                        <TableCell numeric padding='dense'>{p.rank}</TableCell>
                        <TableCell numeric padding='dense'>{p.gamesPlayed}</TableCell>
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
            <TablePagination
              component={Box}
              count={this.props.leaderboard.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
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
