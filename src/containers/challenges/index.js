import React, { Component } from 'react';
import {bindActionCreators} from "redux";

import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


import { player } from '../../actions';

const Root = styled(Flex)`
    width: 100%;
    overflow-x: auto;
`;

const StyledPaper = styled(Paper)`
  min-height: 40px;
  min-width: 350px;
`;

const StyledChip = styled(Chip)`
  margin-right: 20px;
`

const StyledTypography = styled(Typography)`
  color: #fff  !important;
`;

const EmptyText = styled(Typography)`
  text-align: center;
  margin-top: 30px !important;
  margin-bottom: 30px !important;
`

const StyledButton = styled(Button)`
  margin-right: 10px !important;
`;


class Challenges extends Component {

  acceptChallenge = (id) => {
    this.props.acceptChallenge({id});
  };

  rejectChallenge = (id) => {
    this.props.rejectChallenge({id});
  };

  render() {
    return (
      <Root flexDirection='column'>
        <Box m="auto" mt="15vh">
          <StyledTypography variant="display1" gutterBottom>
            Received
          </StyledTypography>
          <StyledPaper>
            <List>
              {this.props.challenges.received.map(c => {
                return (
                  <ListItem key={c._id}>
                    <Avatar src={c.challenger.photo} />
                    <ListItemText primary={c.challenger.username} />
                    <ListItemSecondaryAction>
                      <StyledButton size="small" variant="contained" color="primary" onClick={() => this.acceptChallenge(c._id)}>
                        Accept
                      </StyledButton>
                      <StyledButton size="small" variant="contained" color="secondary" onClick={() => this.rejectChallenge(c._id)}>
                        Reject
                      </StyledButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
              {this.props.challenges.received.length === 0 &&
                <EmptyText variant="body2">
                  You don't currently have any open challenges
                </EmptyText>
              }
            </List>
          </StyledPaper>
        </Box>
        <Box m="auto" mt="5vh">
          <StyledTypography variant="display1" gutterBottom>
            Sent
          </StyledTypography>
          <StyledPaper>
            <List>
              {this.props.challenges.sent.map(c => {
                return (
                  <ListItem key={c._id}>
                    <Avatar src={c.opponent.photo} />
                    <ListItemText primary={c.opponent.username} />
                    <ListItemSecondaryAction>
                      <StyledChip label="Pending Response" />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
              {this.props.challenges.sent.length === 0 &&
                <EmptyText variant="body2">
                  You haven't sent any challenges that are still pending
                </EmptyText>
              }
            </List>
          </StyledPaper>
        </Box>
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  challenges: state.challenges
});

const mapDispatchToProps = dispatch => bindActionCreators({
  challenge: player.challenge,
  acceptChallenge: player.acceptChallenge,
  rejectChallenge: player.rejectChallenge
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Challenges);
