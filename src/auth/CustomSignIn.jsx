import React, { Component } from "react";
import { Auth } from "aws-amplify";
import {
  TextField,
  Button,
  Link,
  Grid,
  InputAdornment,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Person, Lock } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import ResetPassword from './ResetPassword';
import Register from './Register';
import Verify from './Verify';

const styles = {
  input: {
    width: '100%',
    'margin-top': '15px',
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
    this.state = {
      error: '',
      username: "",
      email: "",
      password: "",
      phone_number: "",
      code: "",
      user: null, // will contain our user data object when signed in
      status: "SignUp"
    };
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
        this.setState({ error: "Invalid username or password." });
      } else if (err.code === "UserNotFoundException") {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        this.setState({ error: "Invalid username or password." });
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

  // Handle changes to form inputs on sign-up, verification and sign-in
  handleFormInput = event => {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes, authState, onStateChange } = this.props;
    const { error } = this.state;
    console.log(this.props);
    console.log(this.state);
    // const [isPasswordHidden, setIsPasswordHidden] = useState(false);

    return (
      <div className="form-container">
        {authState === 'forgotPassword' && (
          <>
            <ResetPassword classes={classes} onStateChange={onStateChange} />
          </>
        )}
        {authState === 'verify' && (
          <>
            <Verify
              onStateChange={onStateChange}
              handleFormInput={this.handleFormInput}
              inputs={this.state}
              classes={classes}
            />
          </>
        )}
        {authState === 'register' && (
          <>
            <Register
              onStateChange={onStateChange}
              handleFormInput={this.handleFormInput}
              inputs={this.state}
              classes={classes}
            />
          </>
        )}
        {this._validAuthStates.includes(authState) && (
          <>
            <h1>
              Welcome back to Pair Care!
            </h1>
            {error && (
              <Alert severity="error"><strong>{error}</strong> Please try again.</Alert>
            )}
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
                id="password"
                key="password"
                name="password"
                label="Password"
                type="password"
                className={classes.input}
                onChange={this.handleInputChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock style={{ color: 'gray' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Link
                component="button"
                variant="body2"
                onClick={() => onStateChange("forgotPassword")}
                style={{ float: 'right' }}
              >
                Forgot Password?
                  </Link>

              <Grid container className={classes['btn-container']} spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Button
                    style={{ width: '100%', borderRadius: '50px' }}
                    className={classes['btn-primary']}
                    type="submit"
                    onClick={(event) => this.handleFormSubmission(event)}
                    variant="contained"
                    color="primary"
                  >
                    Login
                      </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    style={{ width: '100%', borderRadius: '50px' }}
                    onClick={() => onStateChange('register')}
                    variant="outlined"
                    color="primary"
                  >
                    Sign up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(CustomSignIn);