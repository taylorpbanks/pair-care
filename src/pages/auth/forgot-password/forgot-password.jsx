import React, { useState, useEffect } from "react";
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
  Email,
  VerifiedUser,
  Lock,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import SuccessConfirmation from './success-confirmation';
import './forgot-password.css'

const ForgotPassword = () => {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState({});
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = 'Pair Care | Forgot Password';
 }, []);

  const handleDataChange = (id, value) => {
    setData({ ...data, [id]: value });
  }
  const handleFormSubmit = event => {
    event.preventDefault();

    if (step === 0) {
      Auth.forgotPassword(data.email.toLowerCase())
        .then(() => setStep(1))
        .catch(err => setError(err.message));
    } else if (step === 1) {
      // Collect confirmation code and new password, then
      Auth.forgotPasswordSubmit(data.email.toLowerCase(), data.code, data.password)
        .then(() => setStep(2))
        .catch(err => setError(err.message));
    }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <Container maxWidth="sm">
        {step !== 2 && (
          <div>
          <h2>Forgot Password?</h2>
        <p style={{ textAlign: 'left' }}>
          No worries!  Type in your email address and we will send you an email with a code to reset if your email is on file.
        </p>
        <br />

        <form onSubmit={handleFormSubmit}>
          {error && (
            <Alert style={{ marginBottom: '15px' }} severity="error"><strong>{error}</strong> Please try again.</Alert>
          )}

          <TextField
            id="email"
            key="email"
            name="email"
            label="Email Address"
            type="text"
            onChange={(e) => { handleDataChange('email', e.target.value); setError(undefined) }}
            autoComplete="off"
            tabIndex="0"
            variant="outlined"
            style={{ width: '100%' }}
            disabled={step !== 0}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email style={{ color: '#226d77' }} />
                </InputAdornment>
              ),
            }}
          />
          {step !== 0 && (
            <div className="mt-30 code-box">
            <p>
              <span style={{fontWeight: 'bold', color: '#226d77'}}>Email Sent!</span>
              &nbsp;&nbsp;
              Please enter the code that was sent to your email, along with a new password for security purposes.
            </p>

            <TextField
              id="code"
              key="code"
              name="code"
              label="Verification Code"
              type="text"
              onChange={(e) => { handleDataChange('code', e.target.value); setError(undefined) }}
              autoComplete="off"
              tabIndex="0"
              variant="outlined"
              style={{ width: '100%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VerifiedUser style={{ color: '#226d77' }} />
                  </InputAdornment>
                ),
              }}
            />

            <br/>
            <br/>
          <TextField
            id="password"
            key="password"
            name="password"
            label="New Password"
            type={showPassword ? 'text': 'password'}
            onChange={(e) => { handleDataChange('password', e.target.value); setError(undefined); }}
            variant="outlined"
            style={{ width: '100%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock style={{ color: '#226d77' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {setShowPassword(!showPassword)}}
                  >
                    {showPassword ? <Visibility style={{ color: '#dc9577' }} /> : <VisibilityOff style={{ color: '#dc9577' }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
            </div>
          )}
          <br />
          <br />
          <div className="btn-container">
            <Button
              onClick={(event) => handleFormSubmit(event)}
              variant="contained"
              color="primary"
              className="double-submit-btn"
            >
              {step !== 0 ? 'Reset Password' : 'Send Code'}
            </Button>

            <Button
              onClick={() => setRedirect('/login')}
              variant="outlined"
              color="primary"
              className="double-submit-btn"
            >
              Back to Sign In
            </Button>
          </div>
        </form>
          </div>
        )}

        {step === 2 && (
          <SuccessConfirmation />
        )}
      </Container>
    </>
  );
}

export default ForgotPassword;
