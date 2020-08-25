import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import {
  Container,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const ChangePassword = () => {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState({});
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleDataChange = (id, value) => {
    setData({ ...data, [id]: value });
  }
  const handleFormSubmit = event => {
    event.preventDefault();

    Auth.currentAuthenticatedUser()
    .then(currentUser => {
      Auth.changePassword(currentUser, data.currentPassword, data.newPassword)
      .then(() => setStep(1))
      .catch(err => setError(err.message));
    })
    .catch(err => setError(err.message));


  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <Container maxWidth="sm">
        {step === 0 && (
          <div>
          <h2>Change Password?</h2>
          <p style={{ textAlign: 'left' }}>
            Type in your old password and a new password and we will get it changed for you. 
          </p>
          <br />

        <form onSubmit={handleFormSubmit}>
          {error && (
            <Alert style={{ marginBottom: '15px' }} severity="error"><strong>{error}</strong> Please try again.</Alert>
          )}

          <TextField
            id="currentPassword"
            key="currentPassword"
            name="currentPassword"
            label="Current Password"
            type="password"
            onChange={(e) => { handleDataChange('currentPassword', e.target.value); setError(undefined) }}
            autoComplete="off"
            tabIndex="0"
            variant="outlined"
            style={{ width: '100%' }}
          />

          <br />
          <br />
          <TextField
            id="newPassword"
            key="newPassword"
            name="newPassword"
            label="New Password"
            type={showPassword ? 'text': 'password'}
            onChange={(e) => { handleDataChange('newPassword', e.target.value); setError(undefined); }}
            variant="outlined"
            style={{ width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {setShowPassword(!showPassword)}}
                  >
                    {showPassword ? <Visibility style={{ color: 'gray' }} /> : <VisibilityOff style={{ color: 'gray' }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <br />
          <br />
          <div className="btn-container">
            <Button
              onClick={(event) => handleFormSubmit(event)}
              variant="contained"
              color="primary"
              className="double-submit-btn"
            >
              Change Password
            </Button>

            <Button
              onClick={() => setRedirect('/profile')}
              variant="outlined"
              color="primary"
              className="double-submit-btn"
            >
              Back to Profile
            </Button>
          </div>
        </form>
          </div>
        )}

        {step === 1 && (
          <div className="text-center">
            <h1>Password changed successfully!</h1>
            <img
              src={require("../../img/unlock-pair.png")}
              alt="pair-care logo"
              style={{width: '400px'}}
            />

            <p>Head back to your <Link to="/profile">Profile</Link>.</p>
          </div>
        )}
      </Container>
    </>
  );
}

export default ChangePassword;
