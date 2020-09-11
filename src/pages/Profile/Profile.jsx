import React, { useState, useEffect } from "react";
import { Auth } from 'aws-amplify';
import {
  Container,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Avatar,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
} from '@material-ui/core';
import {
  Person,
  Cake,
  LocationOn,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import {
  deepOrange,
  deepPurple,
  red,
  pink,
  indigo,
  cyan,
  teal,
  brown,
  grey,
  green,
} from '@material-ui/core/colors';
import colors from '../../constants/colors';
import './Profile.css';

const useStyles = makeStyles((theme) => ({
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  indigo: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
  teal: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
  },
  brown: {
    color: theme.palette.getContrastText(brown[500]),
    backgroundColor: brown[500],
  },
  grey: {
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
  },
  cyan: {
    color: theme.palette.getContrastText(cyan[500]),
    backgroundColor: cyan[500],
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [error, setError] = useState(undefined);
  const [confirmation, setConfirmation] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [data, setData] = useState({});

  useEffect(() => {
    Auth.currentUserInfo().then(response => {
      const initials = response.attributes['custom:firstName'] ?
      response.attributes['custom:firstName'].charAt(0).toUpperCase() + response.attributes['custom:lastName'].charAt(0).toUpperCase() :
      '';

      setUser({ ...response.attributes, initials });
      setData({ ...response.attributes, initials });
    });
  }, []);

  const handleDataChange = (id, value) => {
    setData({...data, [id]: value});
  };

  const changedFields = () => {
    const keys = Object.keys(data);
    var changes = {};

    keys.forEach((key) => {
      if (user[key] !== data[key]) {
        changes = {...changes, [key]: data[key]};
      }
    })

    return changes;
  }

  const handleUpdate = event => {
    event.preventDefault();

    Auth.currentAuthenticatedUser()
      .then(currentUser => {
        Auth.updateUserAttributes(currentUser, changedFields())
        .then(() => {
          setConfirmation('Your profile information has been successfully saved.');
          setUser({...data});
        })
        .catch(err => setError(err.message))
      })
      .catch(err => setError(err.message));
  };

  const isChanged = () => {
    if (!user) {
      return false;
    }

    const changes = changedFields();
    return Object.keys(changes).length !== 0;
  }

  return (
    <>
      <Container maxWidth="sm" className="parent">
        <h1>Account Profile</h1>
        {user && (
          <form onSubmit={handleUpdate}>
            <Grid container spacing={3}>
              <Grid item xs={12} className="text-center">
                <Avatar className={`${user['custom:color'] ? classes[user['custom:color']] : classes.purple} margin-auto`}>{user.initials}</Avatar>
                <p>
                  {user.email}
                  <br />
                  <small><Link to="/change-password">Change Password</Link></small>
                </p>
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <Alert style={{ marginBottom: '15px' }} severity="error"><strong>{error}</strong> Please try again.</Alert>
                </Grid>
              )}

              {confirmation && (
                <Grid item xs={12}>
                  <Alert style={{ marginBottom: '15px' }} severity="success" onClose={() => {setConfirmation(false)}}>
                    <strong>Success!</strong> {confirmation}
                  </Alert>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  key="firstName"
                  name="firstName"
                  label="First Name"
                  type="firstName"
                  onChange={(e) => { handleDataChange('custom:firstName', e.target.value); setError(undefined); }}
                  variant="outlined"
                  value={data['custom:firstName']}
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  key="lastName"
                  name="lastName"
                  label="Last Name"
                  type="lastName"
                  onChange={(e) => { handleDataChange('custom:lastName', e.target.value); setError(undefined); }}
                  variant="outlined"
                  value={data['custom:lastName']}
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="date"
                  aria-label="Birthday"
                  type="date"
                  variant="outlined"
                  label="Child/ren Birthday"
                  value={data['custom:childBirthday']}
                  onChange={(e) => { handleDataChange('custom:childBirthday', e.target.value) }}
                  InputLabelProps={{
                    shrink: true,
                    required: false,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Cake style={{ color: '#226d77' }} />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="zipcode"
                  key="zipcode"
                  name="zipcode"
                  label="Zip Code"
                  type="zipcode"
                  onChange={(e) => { handleDataChange('custom:zipcode', e.target.value); setError(undefined); }}
                  variant="outlined"
                  value={data['custom:zipcode']}
                  InputLabelProps={{ required: false }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn style={{ color: '#226d77' }} />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>



              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">I am a...</FormLabel>
                  <RadioGroup
                    aria-label="parent"
                    name="parent"
                    value={data['custom:parentType'] || user['custom:childGender']}
                    onChange={(e) => { handleDataChange('custom:parentType', e.target.value) }}
                  >
                    <FormControlLabel value="N" control={<Radio />} label="New Parent" />
                    <FormControlLabel value="S" control={<Radio />} label="Seasoned Parent" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">I am having...</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={data['custom:childGender'] || user['custom:childGender']}
                    onChange={(e) => { handleDataChange('custom:childGender', e.target.value) }}
                  >
                    <FormControlLabel value="M" control={<Radio />} label="A boy" />
                    <FormControlLabel value="F" control={<Radio />} label="A girl" />
                    <FormControlLabel value="S" control={<Radio />} label="A surprise" />
                    <FormControlLabel value="T" control={<Radio />} label="More than one" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} className="text-center">
                <Button
                  className="single-submit-btn"
                  style={{ borderRadius: '50px' }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isChanged()}
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
    </>
  );
}

export default Profile;
