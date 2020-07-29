import React, { Component } from "react";
import { Auth } from "aws-amplify";
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
} from '@material-ui/core';
import {
  Person,
  Lock,
  Email,
  PhoneIphone,
} from '@material-ui/icons';

export default class Register extends Component {

  handleSignUp = event => {
    event.preventDefault();
    const { username, email, password, phone_number } = this.props.inputs;
    Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        phone_number // optional - E.164 number convention
        // other custom attributes
      },
      validationData: [] //optional
    })
      .then(data => console.log(data))
      .then(() => this.props.onStateChange('verify')) // switches Sign Up to Verification
      .catch(err => console.log(err))
  };

  render() {
    const { classes, onStateChange, handleFormInput, inputs } = this.props;

    return (
      <>
        <h1>Sign up</h1>
        <p style={{ textAlign: 'left' }}>
          Create your login information.
        </p>

        <form onSubmit={this.handleSignUp}>
          <TextField
            id="username"
            key="username"
            name="username"
            label="Username"
            type="text"
            className={classes.input}
            onChange={handleFormInput}
            autoComplete="off"
            variant="outlined"
            value={inputs.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person style={{ color: 'gray' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="password"
            key="password"
            name="password"
            label="Password"
            type="password"
            className={classes.input}
            onChange={handleFormInput}
            variant="outlined"
            value={inputs.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock style={{ color: 'gray' }} />
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
            className={classes.input}
            onChange={handleFormInput}
            variant="outlined"
            value={inputs.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email style={{ color: 'gray' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="phone_number"
            key="phone_number"
            name="phone_number"
            label="Phone Number"
            type="text"
            className={classes.input}
            onChange={handleFormInput}
            variant="outlined"
            value={inputs.phone_number}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphone style={{ color: 'gray' }} />
                </InputAdornment>
              ),
            }}
          />

          <Grid container className={classes['btn-container']} spacing={3}>
            <Grid item xs={12} sm={6}>
              <Button
                style={{ width: '100%', borderRadius: '50px' }}
                className={classes['btn-primary']}
                onClick={(event) => this.handleSignUp(event)}
                variant="contained"
                color="primary"
              >
                Sign up
        </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                style={{ width: '100%', borderRadius: '50px' }}
                onClick={() => onStateChange('signIn')}
                variant="outlined"
                color="primary"
              >
                Cancel
            </Button>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}