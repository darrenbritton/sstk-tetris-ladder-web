import React, { Component } from 'react';
import {bindActionCreators} from "redux";

import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import TimeAgo from 'react-timeago'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { player } from '../../actions';

const Root = styled(Flex)`
  width: 100%;
  overflow-x: auto;
`;

const StyledChip = styled(Chip)`
  margin-right: 20px;
`

const StyledAvatar = styled(Avatar)`
   display: inline-block !important;
`;

const StyledTypography = styled(Typography)`
  color: #fff  !important;
`;

const UserTitle = styled.p`
  display: inline-block;
  vertical-align: bottom;
  @media (min-width: 675px) {
    margin-left: 10px;
  }
`;

class Leaderboard extends Component {

  findPlayer = (id) => {
    return this.props.leaderboard.find(player => id === player._id);
  };

  render() {
    return (
      <Root flexDirection='column'>
        <Box m="auto" mt="15vh">
          <StyledTypography variant="display1" gutterBottom>
            Pending
          </StyledTypography>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding='dense'>Challenger</TableCell>
                  <TableCell padding='dense'>Opponent</TableCell>
                  <TableCell padding='dense'>Accepted</TableCell>
                  <TableCell padding='dense'>State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.games.pending.map(g => {
                  const challenger = this.findPlayer(g.challenger);
                  const opponent = this.findPlayer(g.opponent);
                  return (
                    <TableRow key={g._id}>
                      <TableCell padding='dense'>
                        <StyledAvatar alt={challenger.username} src={challenger.photo} />
                        <UserTitle>{challenger.username}</UserTitle>
                      </TableCell>
                      <TableCell padding='dense'>
                        <StyledAvatar alt={opponent.username} src={opponent.photo} />
                        <UserTitle>{opponent.username}</UserTitle>
                      </TableCell>
                      <TableCell padding='dense'>
                        <TimeAgo date={g.created_at} />
                      </TableCell>
                      <TableCell padding='dense'>
                        {g.inProgress ? <StyledChip label='In Progress'/> : <StyledChip label='Waiting For Players...'/> }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Box>
        <Box m="auto" mt="15vh">
          <StyledTypography variant="display1" gutterBottom>
            Recent
          </StyledTypography>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding='dense'>Winner</TableCell>
                  <TableCell padding='dense'>Loser</TableCell>
                  <TableCell padding='dense'>Ranking Delta</TableCell>
                  <TableCell padding='dense'>State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.games.recent.map(g => {
                  const challenger = this.findPlayer(g.challenger);
                  const opponent = this.findPlayer(g.opponent);
                  return (
                    <TableRow key={g._id}>
                      <TableCell padding='dense'>
                        <StyledAvatar alt={challenger.username} src={challenger.photo} />
                        <UserTitle>{challenger.username}</UserTitle>
                      </TableCell>
                      <TableCell padding='dense'>
                        <StyledAvatar alt={opponent.username} src={opponent.photo} />
                        <UserTitle>{opponent.username}</UserTitle>
                      </TableCell>
                      <TableCell padding='dense'>
                        <TimeAgo date={g.created_at} />
                      </TableCell>
                      <TableCell padding='dense'>
                        {g.inProgress ? <StyledChip label='In Progress'/> : <StyledChip label='Waiting For Players...'/> }
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
  games: state.games,
  leaderboard: state.leaderboard
});

const mapDispatchToProps = dispatch => bindActionCreators({
  challenge: player.challenge
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Leaderboard);
