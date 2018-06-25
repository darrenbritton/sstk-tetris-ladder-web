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
import Button from '@material-ui/core/Button';

import { player, display, game } from '../../actions';

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

const StyledButton = styled(Button)`
  margin-right: 10px !important;
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

  initiateGame = (id) => {
    this.props.togglePlayDialog();
    this.props.initiate({id});
  };

  render() {
    const { player, games } =this.props;
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
                {games.pending.map(g => {
                  const challenger = this.findPlayer(g.challenger);
                  const opponent = this.findPlayer(g.opponent);
                  return (
                    <TableRow key={g._id}>
                      <TableCell padding='dense'>
                        <StyledAvatar src={challenger.photo} />
                        <UserTitle>{challenger.username}</UserTitle>
                      </TableCell>
                      <TableCell padding='dense'>
                        <StyledAvatar src={opponent.photo} />
                        <UserTitle>{opponent.username}</UserTitle>
                      </TableCell>
                      <TableCell padding='dense'>
                        <TimeAgo date={g.created_at} />
                      </TableCell>
                      <TableCell padding='dense'>
                        {(challenger._id === player.id || opponent._id === player.id) && !g.inProgress ?
                          <StyledButton size="small" variant="contained" color="primary" onClick={() => this.initiateGame(g._id)}>
                            Play
                          </StyledButton>
                          : (challenger._id === player.id || opponent._id === player.id) && g.inProgress ?
                            <StyledButton size="small" variant="contained" color="primary" onClick={() => this.props.togglePlayDialog()}>
                              Continue
                            </StyledButton>
                          : g.inProgress ?
                            <StyledChip label='In Progress'/>
                            : <StyledChip label='Waiting For Players...'/>
                        }
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
                  <TableCell padding='dense'>Time</TableCell>
                  <TableCell padding='dense'>Ranking Delta</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {games.recent.map(g => {
                  const winner = this.findPlayer(g.winner);
                  const loser = this.findPlayer(g.winner === g.challenger ? g.opponent : g.challenger);
                  return (
                    <TableRow key={g._id}>
                      <TableCell padding='dense'>
                        <StyledAvatar src={winner.photo} />
                        <UserTitle>{winner.username}</UserTitle>
                      </TableCell>
                      <TableCell padding='dense'>
                        <StyledAvatar src={loser.photo} />
                        <UserTitle>{loser.username}</UserTitle>
                      </TableCell>
                      <TableCell padding='dense'>
                        <TimeAgo date={g.created_at} />
                      </TableCell>
                      <TableCell padding='dense'>
                        {Math.abs(winner.rank - loser.rank)}
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
  leaderboard: state.leaderboard,
  player: state.player
});

const mapDispatchToProps = dispatch => bindActionCreators({
  challenge: player.challenge,
  togglePlayDialog: display.togglePlayDialog,
  initiate: game.initiate
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Leaderboard);
