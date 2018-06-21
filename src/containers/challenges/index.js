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

const StyledButton = styled(Button)`
  margin-right: 10px !important;
`;


class Challenges extends Component {
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
    this.setState({ anchorEl: null });
    this.props.challenge({ opponent: id});
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
                    <ListItem>
                      <Avatar alt={c.challenger.username} src={c.challenger.photo} />
                      <ListItemText primary={c.challenger.username} />
                      <ListItemSecondaryAction>
                        <StyledButton size="small" variant="contained" color="primary">
                          Accept
                        </StyledButton>
                        <StyledButton size="small" variant="contained" color="secondary">
                          Reject
                        </StyledButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
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
                console.log(c)
                return (
                  <ListItem>
                    <Avatar alt={c.opponent.username} src={c.opponent.photo} />
                    <ListItemText primary={c.opponent.username} />
                    <ListItemSecondaryAction>
                      <StyledChip label="Pending Response" />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
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
  challenge: player.challenge
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Challenges);
