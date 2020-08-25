import React from "react";
import { Link } from 'react-router-dom';
import './forgotPassword.css'

const SuccessConfirmation = () => {
  return (
    <div className="text-center">
      <h1>
        Password Successfully Reset!
      </h1>
      <img
        src={require("../../../img/unlock-pair.png")}
        alt="pair-care logo"
        style={{width: '300px'}}
      />
      <p>Head over to the <Link to="/login">Sign In</Link> page to get back to your lists!</p>
    </div>
  );
}

export default SuccessConfirmation;
