import React from "react";
import Content from './framework/content';
import Header from './framework/header/header';
import Footer from './framework/footer/footer';

import {
  BrowserRouter as Router,
} from "react-router-dom";

function InternalApp({ authState, onStateChange }) {
  return (
    <Router>
      <Header authState={authState} onStateChange={onStateChange} />
      <div className="container height-100">
        <Content authState={authState} onStateChange={onStateChange} />
      </div>
      <Footer />
    </Router>
  )
}

export default InternalApp;