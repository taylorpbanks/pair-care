import React, { Component } from "react";
import logo from "../src/logo.svg";
import {  AmplifySignOut } from '@aws-amplify/ui-react';

export class InternalApp extends Component {
  render() {
    if (this.props.authState === "signedIn") {
      return (
        <>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Internal Application behind Login</p>
          <AmplifySignOut />
        </>
      );
    } else {
      return null;
    }
  }
}