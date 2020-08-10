import React from "react";
import Content from './framework/Content';
import Header from './framework/Header';
import {
  BrowserRouter as Router,
} from "react-router-dom";

function InternalApp({ authState, onStateChange }) {
  console.log(authState);
  return (
    <Router>
      <Header authState={authState} onStateChange={onStateChange} />
      <div className="container height-100">
        <Content authState={authState} onStateChange={onStateChange} />
      </div>
    </Router>
  )
}

export default InternalApp;