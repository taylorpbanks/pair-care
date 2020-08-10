import React, { Component } from 'react';
import InternalApp from '../InternalApp';
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

    return (
      <div className="flex-1 height-100">
        <InternalApp authState={this.props.authState} onStateChange={this.props.onStateChange} />
      </div>
    );
  }
}

export default withStyles(styles)(AuthWrapper);