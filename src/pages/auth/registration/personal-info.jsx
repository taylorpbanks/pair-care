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
import colors from '../../../constants/colors';

const PersonalInfo = ({ setStep, data, handleDataChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(undefined);

  const handleSignUp = event => {
    event.preventDefault();
    const {
      email,
      password,
      childGender,
      yearOfBirth,
      parentType,
      firstName,
      lastName,
      zipcode,
    } = data;

    const randomNumber = Math.floor(Math.random() * Math.floor(10));

    Auth.signUp({
      username: email.toLowerCase(),
      password,
      attributes: {
        email,
        'custom:childGender': childGender,
        'custom:yearOfBirth': yearOfBirth || '',
        'custom:zipcode': zipcode,
        'custom:parentType': parentType,
        'custom:firstName': firstName,
        'custom:lastName': lastName,
        'custom:color': colors[randomNumber],
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
            InputLabelProps={{ required: false }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person style={{ color: '#226d77' }} />
                </InputAdornment>
              ),
            }}
            required
          />

          <TextField
            id="lastName"
            key="lastName"
            name="lastName"
            label="Last Name"
            type="lastName"
            onChange={(e) => { handleDataChange('lastName', e.target.value); setError(undefined); }}
            variant="outlined"
            InputLabelProps={{ required: false }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person style={{ color: '#226d77' }} />
                </InputAdornment>
              ),
            }}
            required
          />

          <TextField
            id="email"
            key="email"
            name="email"
            label="Email"
            type="email"
            onChange={(e) => { handleDataChange('email', e.target.value); setError(undefined); }}
            variant="outlined"
            InputLabelProps={{ required: false }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email style={{ color: '#226d77' }} />
                </InputAdornment>
              ),
            }}
            required
          />

          <TextField
            id="password"
            key="password"
            name="password"
            label="Password"
            type={showPassword ? 'text': 'password'}
            onChange={(e) => { handleDataChange('password', e.target.value); setError(undefined); }}
            variant="outlined"
            InputLabelProps={{ required: false }}
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
            required
          />

          <Grid container spacing={3}>
            <Grid item xs={12} className="text-center">
              <Button
                variant="contained"
                color="primary"
                className="single-submit-btn"
                type="submit"
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
