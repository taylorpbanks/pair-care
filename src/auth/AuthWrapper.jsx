import React, { Component } from "react";
import { InternalApp } from "../InternalApp";
import CustomSignIn from "./CustomSignIn";
import {
  Container,
  Paper,
  Box,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  input: {
    width: '100%',
    'margin-top': '15px',
    'margin-bottom': '5px',
  },
  'btn-container': {
    'margin-top': '60px',
    '~ button': {
      width: '100%',
    },
  },
  'logo-container': {
    'margin-bottom': '30px',
    'text-align': 'center',
  },
  'btn-primary': {
    color: 'white'
  },
  authContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

class AuthWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.updateUsername = this.updateUsername.bind(this);
  }

  updateUsername(newUsername) {
    this.setState({ username: newUsername });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="flex-1">
        {this.props.authState !== 'signedIn' && (
          <Container maxWidth="sm" className={classes.authContainer}>
            <Paper elevation={3} p={2}>
              <Box p={3}>
                <div className={classes['logo-container']}>
                  <img
                    src={require("../img/paircare-logo-color.png")}
                    alt="pair-card logo"
                    style={{ maxWidth: '300px' }}
                  />
                </div>
                <CustomSignIn
                  authState={this.props.authState}
                  updateUsername={this.updateUsername}
                  onStateChange={this.props.onStateChange}
                  classes={this.props.classes}
                />
              </Box>
            </Paper>
          </Container>
        )}

        <InternalApp authState={this.props.authState} onStateChange={this.props.onStateChange} />
      </div>
    );
  }
}

export default withStyles(styles)(AuthWrapper);