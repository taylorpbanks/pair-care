import React from "react";
import { Link } from 'react-router-dom';
import './forgot-password.css'

const SuccessConfirmation = () => {
  return (
    <div className="text-center">
      <h1>
        Password Successfully Reset!
      </h1>
      <p>Head over to the <Link to="/login">Sign In</Link> page to get back to your lists!</p>
    </div>
  );
}

export default SuccessConfirmation;
