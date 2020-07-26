import React, { Component, useState } from "react";
import { Auth } from "aws-amplify";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Link,
  Grid,
  InputAdornment,
} from '@material-ui/core';
import {Person, Lock} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  input: {
    width: '100%',
    'margin-top': '5px',
    'margin-bottom': '5px',
  },
  'btn-container': {
    'margin-top': '60px',
    '~ button': {
      width: '100%',
    },
  },
  'logo-container': {
    'margin-bottom': '30px',
    'text-align': 'center',
  },
  'btn-primary': {
    color: 'white'
  }
};

class CustomSignIn extends Component {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
    this.signIn = this.signIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.state = {};
  }

  handleFormSubmission(evt) {
    evt.preventDefault();
    this.signIn();
  }

  async signIn() {
    const username = this.inputs.username;
    const password = this.inputs.password;
    try {
      await Auth.signIn(username, password);
      this.props.onStateChange("signedIn", {});
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        this.props.updateUsername(username);
        await Auth.resendSignUp(username);
        this.props.onStateChange("confirmSignUp", {});
      } else if (err.code === "NotAuthorizedException") {
        // The error happens when the incorrect password is provided
        this.setState({ error: "Login failed." });
      } else if (err.code === "UserNotFoundException") {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        this.setState({ error: "Login failed." });
      } else {
        this.setState({ error: "An error has occurred." });
        console.error(err);
      }
    }
  }

  handleInputChange(evt) {
    this.inputs = this.inputs || {};
    const { name, value, type, checked } = evt.target;
    const check_type = ["radio", "checkbox"].includes(type);
    this.inputs[name] = check_type ? checked : value;
    this.inputs["checkedValue"] = check_type ? value : null;
    this.setState({ error: "" });
  }

  render() {
    const { classes } = this.props;
    // const [isPasswordHidden, setIsPasswordHidden] = useState(false);

    return (
      <>
        {this._validAuthStates.includes(this.props.authState) && (

          <Container maxWidth="sm">
            <Paper elevation={3} p={2}>
              <Box p={3}>
                <div className={classes['logo-container']}>
                  <img
                    src={require("../img/paircare-logo-color.png")}
                    alt="pair-card logo"
                    style={{ maxWidth: '300px' }}
                  />
                </div>
                <h1>
                  Welcome back to Pair Care!
                </h1>
                <form onSubmit={this.handleFormSubmission}>
                  <TextField
                    id="username"
                    key="username"
                    name="username"
                    label="Username"
                    type="text"
                    className={classes.input}
                    onChange={this.handleInputChange}
                    autoComplete="off"
                    tabIndex="0"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
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
                    onChange={this.handleInputChange}
                    tabIndex="1"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Link
                    component="button"
                    variant="body2"
                    // onClick={() => onStateChange("forgotPassword")}
                    style={{ float: 'right' }}
                    tabIndex="5"
                  >
                    Forgot Password?
                  </Link>

                  <Grid container  className={classes['btn-container']} spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        style={{ width: '100%', borderRadius: '50px' }}
                        className={classes['btn-primary']}
                        onClick={() => this.handleFormSubmission()}
                        variant="contained"
                        color="primary"
                        tabIndex="3"
                      >
                        Login
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Button
                        style={{ width: '100%', borderRadius: '50px' }}
                        onClick={() => this.handleFormSubmission()}
                        variant="outlined"
                        color="primary"
                        tabIndex="4"
                      >
                        Sign up
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Paper>
          </Container>
        )}
      </>
    );
  }
}

export default withStyles(styles)(CustomSignIn);