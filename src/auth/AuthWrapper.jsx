import React, { Component } from "react";
import { InternalApp } from "../InternalApp";
import CustomSignIn from "./CustomSignIn";
import Footer from '../framework/Footer';

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
      <div className="flex-1">
        <CustomSignIn
          authState={this.props.authState}
          updateUsername={this.updateUsername}
          onStateChange={this.props.onStateChange}
        />
        <Footer />
        <InternalApp authState={this.props.authState} onStateChange={this.props.onStateChange} />
      </div>
    );
  }
}

export default AuthWrapper;