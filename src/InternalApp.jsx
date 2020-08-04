import React, { Component } from "react";
import Content from './framework/Content';
import Header from './framework/Header';
import {
  BrowserRouter as Router,
} from "react-router-dom";

export class InternalApp extends Component {
  render() {
    if (this.props.authState === 'signedIn') {
      return (
        <Router>
          <Header />
          <div className="container">
            <Content />
            <p>Internal Application behind Login</p>
          </div>
        </Router>
      );
    } else {
      return null;
    }
  }
}