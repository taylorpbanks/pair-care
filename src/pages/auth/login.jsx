import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import {
  Container,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import {
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { Redirect, Link } from 'react-router-dom';
import { ActionCreators } from '../../redux/profile/actions';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  input: {
    width: '100%',
    'margin-top': '5px',
    'margin-bottom': '5px',
  },
  'btn-container': {
    'margin-top': '60px',
  },
});

const Login = ({ addUser }) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    code: ''
  });

  const handleInputChange = (e, id) => {
    setError(undefined);
    const { value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const signInClick = async (e) => {
    e.preventDefault();

    try {
      Auth.signIn(formData.username, formData.password).then(() => {
        Auth.currentAuthenticatedUser().then(user => {
          localStorage.setItem('userDataKey', user.userDataKey);
          localStorage.setItem('sub', user.attributes.sub);
          localStorage.setItem('email', user.attributes.email);
          addUser(user);
          setRedirect('/my-list');
        });
      }).catch(err => {
        if (err.code === "UserNotConfirmedException") {
          setError('You have not confirmed this email address.');
        } else if (err.code === "NotAuthorizedException") {
          // The error happens when the incorrect password is provided
          setError('Invalid username or password.');
        } else if (err.code === "UserNotFoundException") {
          // The error happens when the supplied username/email does not exist in the Cognito user pool
          setError('Invalid username or password.');
        } else {
          setError('An unexpected error has occurred.');
        }
      })
    }
    catch (err) {
      if (err.code === "UserNotConfirmedException") {
        setError('You have not confirmed this email address.');
      } else if (err.code === "NotAuthorizedException") {
        // The error happens when the incorrect password is provided
        setError('Invalid username or password.');
      } else if (err.code === "UserNotFoundException") {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        setError('Invalid username or password.');
      } else {
        setError('An unexpected error has occurred.');
      }
    }
  }

  const goToRegister = () => {
    setRedirect('register');
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  //TO DO: fix broken sign up and forgot password links
  return (
    <div>
      <Container maxWidth="sm">
        <Box p={3}>
          <h1>Sign In</h1>
          <p>Welcome back to Pair Care, where sharing your items just got easier.</p>
            {error && (
              <Alert style={{marginBottom: '15px'}} severity="error"><strong>{error}</strong> Please try again.</Alert>
            )}
          <form onSubmit={(e) => signInClick(e)}>
            <TextField
              id="username"
              key="username"
              name="username"
              label="Email Address"
              type="text"
              className={classes.input}
              onChange={(e) => handleInputChange(e, 'username')}
              autoComplete="off"
              variant="outlined"
              InputLabelProps={{ required: false }}
              required
            />

            <TextField
              id="password"
              key="password"
              name="password"
              label="Password"
              type={showPassword ? 'text': 'password'}
              className={classes.input}
              onChange={(e) => handleInputChange(e, 'password')}
              InputLabelProps={{ required: false }}
              InputProps={{
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
              variant="outlined"
              required
            />

            <Link
              to="/forgot-password"
              style={{ float: 'right', fontSize: '.8em' }}
            >
              Forgot Password?
            </Link>

            <div className={`${classes['btn-container']} btn-container`}>
              <Button
                variant="contained"
                color="primary"
                className="double-submit-btn"
                type="submit"
              >
                Sign In
                </Button>

              <Button
                onClick={() => goToRegister()}
                variant="outlined"
                color="primary"
                className="double-submit-btn"
              >
                Sign up
              </Button>
            </div>
          </form>
        </Box>
      </Container>
    </div >
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    addUser: (user) => dispatch(ActionCreators.addProfile(user)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
