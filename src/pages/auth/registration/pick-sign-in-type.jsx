import React, { useState } from "react";
import {
  Container,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import './registration.css';
import { GoogleLogin } from 'react-google-login';

const PickSignInType = ({ setStep }) => {
  const [googleError, setGoogleError] = useState(false)
  const responseGoogle = (response) => {
    console.log(response);
    if(response?.error === 'idpiframe_initialization_failed') {
      setGoogleError(true);
    }
  }

  return (
    <Container maxWidth="lg">
      <h2>How do you want to sign up?</h2>
      <div onClick={() => setStep(1)} className="email-btn">
        <div className="email-icon-container">
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <span className="email-text-container">
          Sign up with Email
        </span>
      </div>
      <br />
      <GoogleLogin
        className="google-btn"
        clientId={'839098953915-ds3fkvd7mbdnh43tmc420gfsfc6q493n.apps.googleusercontent.com'}
        buttonText="Sign up with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        disabled={googleError}
      />
      {googleError && (<div style={{float: 'right', fontSize: '10px', paddingRight: '3px'}}>
        Coming soon!
      </div>)}
    </Container>
  );
}

export default PickSignInType;
