import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Link,
} from '@material-ui/core';
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
  'logo-container': {
    'margin-bottom': '30px',
    'text-align': 'center',
  }
});

const Login = (props) => {
  const classes = useStyles();
  const { authState, onStateChange } = props;
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    code: ''
  });

  const handleInputChange = e => {
    const { value, dataset } = e.target;
    const { prop } = dataset;
    setFormData({
      ...formData,
      [prop]: value
    });
  };

  const signInClick = async () => {
    try {
      await Auth.signIn(formData.username, formData.password);
      onStateChange(authState);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Container maxWidth="sm">
        <Paper elevation={3} p={2}>
          <Box p={3}>
            <div className={classes['logo-container']}>
              <img
                src={require("../img/paircare-logo-color.png")}
                alt="pair-card logo"
                style={{maxWidth: '300px'}}
              />
            </div>

            <form>
              <TextField
                id="username"
                key="username"
                name="username"
                label="Username"
                type="text"
                className={classes.input}
                onChange={handleInputChange}
                autoComplete="off"
              />

              <TextField
                id="password"
                key="password"
                name="password"
                label="Password"
                type="password"
                className={classes.input}
                onChange={handleInputChange}
              />

              <Link
                component="button"
                variant="body2"
                onClick={() => onStateChange("forgotPassword")}
                style={{float: 'right'}}
              >
                Forgot Password?
              </Link>

              <div className={classes['btn-container']}>
                <Button
                  onClick={() => signInClick()}
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>

                <Button
                  onClick={() => signInClick()}
                  variant="outlined"
                  color="primary"
                >
                  Sign up
                </Button>
              </div>
            </form>
          </Box>
        </Paper>
      </Container>
    </div >
  );
}

export default Login;
