
import React, { Component } from "react";
import { Auth } from "aws-amplify";
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
} from '@material-ui/core';
import {
  VerifiedUser,
} from '@material-ui/icons';

export default class Verify extends Component {
  handleVerification = event => {
    event.preventDefault();
    const { username, code } = this.props.inputs;
    // After retrieving the confirmation code from the user
    Auth.confirmSignUp(username, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(data => console.log(data))
      .then(() => this.props.onStateChange('signIn'))
      .catch(err => console.log(err));
  };

  render() {
    const { classes, handleFormInput, inputs } = this.props;

    return (
      <>
        <h1>Verify Email</h1>
        <p style={{ textAlign: 'left' }}>
          Please enter the code sent to your provided email to verify your email address and get started.
        </p>

        <form onSubmit={this.handleVerification}>
          <TextField
            id="code"
            key="code"
            name="code"
            label="Verification Code"
            type="text"
            className={classes.input}
            onChange={handleFormInput}
            autoComplete="off"
            tabIndex="0"
            variant="outlined"
            value={inputs.code}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VerifiedUser style={{ color: 'gray' }} />
                </InputAdornment>
              ),
            }}
          />

          <Grid container className={classes['btn-container']} spacing={3}>
            <Grid item xs={12} sm={6}>
              <Button
                style={{ width: '100%', borderRadius: '50px' }}
                className={classes['btn-primary']}
                onClick={(event) => this.handleVerification(event)}
                variant="contained"
                color="primary"
                tabIndex="2"
              >
                Submit Code
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}