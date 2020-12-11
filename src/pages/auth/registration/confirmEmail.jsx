import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import {
  Container,
  TextField,
  Button,
  Grid,
  InputAdornment,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { VerifiedUser } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import './registration.css';

const ConfirmEmail = ({ data, handleDataChange }) => {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(undefined);

  const handleVerification = event => {
    event.preventDefault();
    // After retrieving the confirmation code from the user log them in
    Auth.confirmSignUp(data.email, data.code)
      .then(() => {
        Auth.signIn(data.email, data.password)
          .then(() => {
            Auth.currentAuthenticatedUser().then(user => {
              localStorage.setItem('userDataKey', user.userDataKey);
              localStorage.setItem('sub', user.attributes.sub);
              localStorage.setItem('email', user.attributes.email);
              setRedirect('/');
            }).catch(() => {
              setRedirect('/');
            });
          })
          .catch(err => setError('You successfully confirmed your email, however, an error occurred when trying to login you in.  Please try to login manually.'))
      })
      .catch(err => setError('Invalid confirmation code.'));
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <Container maxWidth="sm">
        <h2>Verify Email</h2>
        <p style={{ textAlign: 'left' }}>
          Please enter the code sent to your provided email to verify your email address to get started.
        </p>

        <form onSubmit={handleVerification}>
          {error && (
            <Alert style={{marginBottom: '15px'}} severity="error"><strong>{error}</strong> Please try again.</Alert>
          )}

          <TextField
            id="code"
            key="code"
            name="code"
            label="Verification Code"
            type="text"
            onChange={(e) => {handleDataChange('code', e.target.value);setError(undefined)}}
            autoComplete="off"
            tabIndex="0"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VerifiedUser style={{ color: '#226d77' }} />
                </InputAdornment>
              ),
            }}
          />

          <Grid container  spacing={3}>
            <Grid item xs={12} sm={6}>
              <Button
                style={{ width: '100%', borderRadius: '50px' }}
                onClick={(event) => handleVerification(event)}
                variant="contained"
                color="primary"
                tabIndex="2"
              >
                Submit Code
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default ConfirmEmail;
