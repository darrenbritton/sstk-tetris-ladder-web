import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';

import { display, game } from '../actions';

const StyledSpinner = styled(CircularProgress)`
  margin: auto !important;
  margin-top: 5vh !important;
`;

const StyledDialogContent = styled(DialogContent)`
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
`;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PlayDialog extends React.Component {

  findPlayer = (id) => {
    return this.props.leaderboard.find(player => id === player._id);
  };

  accept = (id) => {
    this.props.accept({id});
  };

  reject = (id) => {
    this.props.reject({id});
    this.props.togglePlayDialog();
  };

  won = (id) => {
    this.props.won({id});
  };

  lost = (id) => {
    this.props.lost({id});
  };

  confirm = (id) => {
    this.props.confirm({id});
    this.props.togglePlayDialog();
  };

  contest = (id) => {
    this.props.contest({id});
    this.props.togglePlayDialog();
  };

  render() {
    return (
      <Dialog
        open={this.props.display.playDialog}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {
          this.props.playing._id && !this.props.playing.inProgress &&
          <div>
            <DialogTitle id="alert-dialog-slide-title">
              {`${this.props.playing.challenger === this.props.player.id ?
                this.findPlayer(this.props.playing.opponent).username :
                this.findPlayer(this.props.playing.challenger).username} would like to start your game`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                click one of the options below to accept or reject the commencement of the game
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() =>this.accept(this.props.playing._id)} color="primary">
                Accept
              </Button>
              <Button onClick={() =>this.reject(this.props.playing._id)} color="primary">
                Reject
              </Button>
            </DialogActions>
          </div>
        }
        {
          this.props.playing.waitingForPlayer &&
            <div>
              <DialogTitle id="alert-dialog-slide-title">
              {"Waiting for opponent to accept..."}
            </DialogTitle>
              <StyledDialogContent>
                <StyledSpinner/>
              </StyledDialogContent>
              <DialogActions>
                <Button onClick={this.props.togglePlayDialog} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </div>
        }
        {
          this.props.playing.inProgress && !this.props.playing.winner &&
          <div>
            <DialogTitle id="alert-dialog-slide-title">
              {"Game In Progress"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Once the game is finished, click on your outcome below
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() =>this.won(this.props.playing._id)} color="primary">
                I Won
              </Button>
              <Button onClick={() =>this.lost(this.props.playing._id)} color="primary">
                I Lost
              </Button>
            </DialogActions>
          </div>
        }
        {
          this.props.playing.inProgress && this.props.playing.winner && this.props.playing.waitingForConfirmationFrom === this.props.player.id &&
          <div>
            <DialogTitle id="alert-dialog-slide-title">
              {`${this.props.playing.challenger === this.props.player.id ?
                this.findPlayer(this.props.playing.opponent).username :
                this.findPlayer(this.props.playing.challenger).username} has declared ${this.props.playing.winner === this.props.player.id ? 'you' : 'themself'} the winner`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                You can either confirm or contest this decision. Contesting will nullify any ranking changes the outcome of this match would have had so only contest as a last resort!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() =>this.contest(this.props.playing._id)} color="secondary">
                Contest
              </Button>
              <Button onClick={() =>this.confirm(this.props.playing._id)} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </div>
        }
        {
          this.props.playing.inProgress && this.props.playing.winner && this.props.playing.waitingForConfirmationFrom !== this.props.player.id &&
          <div>
            <DialogTitle id="alert-dialog-slide-title">
              {`waiting for opponent to confirm result`}
            </DialogTitle>
            <StyledDialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                If your opponent contests the result it will nullify any ranking changes the outcome of this match would have had so don't try to cheat!
              </DialogContentText>
              <StyledSpinner/>
            </StyledDialogContent>
          </div>
        }
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  display: state.display,
  playing: state.playing,
  player: state.player,
  leaderboard: state.leaderboard
});

const mapDispatchToProps = dispatch => bindActionCreators({
  togglePlayDialog: display.togglePlayDialog,
  accept: game.accept,
  reject: game.reject,
  won: game.win,
  lost: game.lose,
  confirm: game.confirm,
  contest: game.contest
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayDialog);
