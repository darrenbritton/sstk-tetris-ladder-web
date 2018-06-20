import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { notify } from "../actions";
import { push } from "react-router-redux";

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class SnackBar extends React.Component {
  state = {
    open: false,
    messageInfo: {},
    queue: []
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.notifications.length > 0) {
      this.setState({queue: this.state.queue.concat(nextProps.notifications)}, () => {
        this.props.notificationClear();
        if (this.state.open) {
          // immediately begin dismissing current message
          // to start showing new one
          this.setState({open: false});
        } else {
          this.processQueue();
        }
      });
    }
  }

  processQueue = () => {
    if (this.state.queue.length > 0) {
      this.setState({
        messageInfo: this.state.queue[0],
        open: true,
        queue: this.state.queue.length > 1 ? this.state.queue.slice(1) : [],
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleAction = (action) => {
    switch (action) {
      case 'chat.send':
        this.props.sendMessage({text: 'hello world!'});
        break;
      default:
        return true;
    }
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { classes } = this.props;
    const { text, action, actionText } = this.state.messageInfo;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{text}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={() => this.handleAction(action)}>
              {actionText || ''}
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications.generic,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  notificationClear: notify.clear,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SnackBar));
