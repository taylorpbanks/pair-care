import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import {
  Container,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import {
  Person,
  Lock,
  Email,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import './registration.css';

const PersonalInfo = ({ setStep, data, handleDataChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(undefined);

  const handleSignUp = event => {
    event.preventDefault();
    const {
      email,
      password,
      childGender,
      childBirthday,
      parentType,
      firstName,
      lastName,
    } = data;

    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        'custom:childGender': childGender,
        'custom:childBirthday': childBirthday,
        'custom:parentType': parentType,
        'custom:firstName': firstName,
        'custom:lastName': lastName,
      },
      validationData: [] //optional
    })
      .then(() => setStep(2))
      .catch(err => setError(err.message))
  };

  return (
    <>
      <Container maxWidth="sm">
        <p style={{ textAlign: 'left' }}>
          Create your login information.
        </p>
        <form onSubmit={handleSignUp}>
          {error && (
              <Alert style={{marginBottom: '15px'}} severity="error"><strong>{error}</strong> Please try again.</Alert>
            )}
          <TextField
            id="firstName"
            key="firstName"
            name="firstName"
            label="First Name"
            type="firstName"
            onChange={(e) => { handleDataChange('firstName', e.target.value); setError(undefined); }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person style={{ color: 'gray' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="lastName"
            key="lastName"
            name="lastName"
            label="Last Name"
            type="lastName"
            onChange={(e) => { handleDataChange('lastName', e.target.value); setError(undefined); }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person style={{ color: 'gray' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="email"
            key="email"
            name="email"
            label="Email"
            type="email"
            onChange={(e) => { handleDataChange('email', e.target.value); setError(undefined); }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email style={{ color: 'gray' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="password"
            key="password"
            name="password"
            label="Password"
            type={showPassword ? 'text': 'password'}
            onChange={(e) => { handleDataChange('password', e.target.value); setError(undefined); }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock style={{ color: 'gray' }} />
                </InputAdornment>
              ),
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

          <Grid container spacing={3}>
            <Grid item xs={12} className="text-center">
              <Button
                onClick={(event) => handleSignUp(event)}
                variant="contained"
                color="primary"
                className="single-submit-btn"
                >
                Sign up
            </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default PersonalInfo;
