import React from 'react';
import { Button } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom';
function Unauthorized({ authState, onStateChange }) {
  const [redirect, setRedirect] = React.useState(undefined);

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Sharing your must have items just got easier!</h1>
      <h2 style={{marginBottom: '5px'}}>Let's get started</h2>

      <Button
        style={{ borderRadius: '50px', color: 'white' }}
        type="submit"
        onClick={() => setRedirect('register')}
        variant="contained"
        color="primary"
      >
        Create a List
      </Button>

      <p style={{marginTop: '30px'}}>
        Already have a list?
        &nbsp;
        <Link to="/login">
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default Unauthorized;