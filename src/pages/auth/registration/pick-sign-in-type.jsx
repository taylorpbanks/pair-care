import React from "react";
import {
  Container,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import './registration.css';

const PickSignInType = ({ setStep }) => {
  return (
    <Container maxWidth="lg">
      <h2>How do you want to sign in?</h2>
      <div className="abcRioButton abcRioButtonLightBlue" onClick={() => setStep(1)}>
          <div className="abcRioButtonContentWrapper">
            <div className="abcRioButtonIcon" style={{padding: '8px'}}>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <span className="abcRioButtonContents" style={{padding: '8px', fontSize: '13px', position: 'relative', top: '8px'}}>
              <span id="not_signed_inu1s4o4b4xudx">Sign in with Email</span>
             </span>
          </div>
      </div>
      <br />
      <div
        id="googlesignin"
        data-longtitle="true"
        className="g-signin2"
        data-onsuccess="onSignIn"
        width="100%"
      />
    </Container>
  );
}

export default PickSignInType;
