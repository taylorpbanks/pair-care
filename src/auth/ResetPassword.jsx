import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
} from '@material-ui/core';
import { Person, CheckCircle } from '@material-ui/icons';

function ResetPassword({ classes, onStateChange }) {
  const [username, setUsername] = useState('');
  const [codeSentSuccessfully, setCodeSentSuccessfully] = useState(false);

  const handleChange = (event) => {
    setUsername({ value: event.target.value });
  }

  const sendCode = () => {
    setCodeSentSuccessfully(true);
  }

  return (
    <>
      <h1>Reset your password</h1>
      <p style={{textAlign: 'left'}}>
        Type in your username and we will send a code to your email with reset instructions.
      </p>

      <form onSubmit={sendCode}>
        <TextField
          id="username"
          key="username"
          name="username"
          label="Username"
          type="text"
          className={classes.input}
          onChange={handleChange}
          autoComplete="off"
          tabIndex="0"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person style={{ color: 'gray' }} />
              </InputAdornment>
            ),
          }}
        />

        <Grid container className={classes['btn-container']} spacing={3}>
        <Grid item xs={12} sm={6}>
            <Button
              style={{ width: '100%', borderRadius: '50px' }}
              className={classes['btn-primary']}
              onClick={() => sendCode()}
              variant="contained"
              color="primary"
              tabIndex="2"
              disabled={codeSentSuccessfully}
            >
              {codeSentSuccessfully && <span><CheckCircle />&nbsp;&nbsp;</span>}
              {codeSentSuccessfully ? 'Code Sent!' : 'Send Code'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              style={{ width: '100%', borderRadius: '50px' }}
              onClick={() => onStateChange('signIn')}
              variant="outlined"
              color="primary"
              tabIndex="3"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}


export default ResetPassword;