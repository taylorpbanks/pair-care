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
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import './Profile.css';

const useStyles = makeStyles((theme) => ({
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
  const [user, setUser] = useState(undefined);
  const [data, setData] = useState({});

  useEffect(() => {
    /*
    Delete when finished working
    const mockUser = {
      'custom:childBirthday': '2020-09-05',
      'custom:childGender': 'F',
      'custom:firstName': 'jane',
      'custom:lastName': 'doe',
      'custom:parentType': 'N',
      'email': 'email@email.com',
      'email_verified': true,
      'initials': 'TB',
    }; */
    Auth.currentUserInfo().then(response => {
      const initials = response.attributes['custom:firstName'] ?
      response.attributes['custom:firstName'].charAt(0).toUpperCase() + response.attributes['custom:lastName'].charAt(0).toUpperCase() :
      '';

      setUser({ ...response.attributes, initials });
      setData({ ...response.attributes, initials });
    });
  }, []);

  const handleDataChange = () => { };

  const handleUpdate = event => {
    /* event.preventDefault();
     const {
       email,
       password,
       childGender,
       childBirthday,
       parentType,
       firstName,
       lastName,
     } = data;
 
     Auth.signUp({
       username: email,
       password,
       attributes: {
         email,
         'custom:childGender': childGender,
         'custom:childBirthday': childBirthday,
         'custom:parentType': parentType,
         'custom:firstName': firstName,
         'custom:lastName': lastName,
       },
       validationData: [] //optional
     })
       .then(() => setStep(2))
       .catch(err => setError(err.message))*/
  };

  return (
    <>
      <Container maxWidth="sm" className="parent">
        <h1>Account Profile</h1>
        {user && (
          <form onSubmit={handleUpdate}>
            {error && (
              <Alert style={{ marginBottom: '15px' }} severity="error"><strong>{error}</strong> Please try again.</Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} className="text-center">
                <Avatar className={`${classes.purple} margin-auto`}>{user.initials}</Avatar>
                <span>{user.email}</span>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="firstName"
                  key="firstName"
                  name="firstName"
                  label="First Name"
                  type="firstName"
                  onChange={(e) => { handleDataChange('firstName', e.target.value); setError(undefined); }}
                  variant="outlined"
                  value={data['custom:firstName']}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person style={{ color: 'gray' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="lastName"
                  key="lastName"
                  name="lastName"
                  label="Last Name"
                  type="lastName"
                  onChange={(e) => { handleDataChange('lastName', e.target.value); setError(undefined); }}
                  variant="outlined"
                  value={data['custom:lastName']}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person style={{ color: 'gray' }} />
                      </InputAdornment>
                    ),
                  }}
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
                  onChange={(e) => { handleDataChange('childBirthday', e.target.value) }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Cake style={{ color: 'gray' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>



              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">I am a...</FormLabel>
                  <RadioGroup aria-label="parent" name="parent" value={user['custom:parentType']} onChange={() => { }}>
                    <FormControlLabel value="N" control={<Radio />} label="New Parent" />
                    <FormControlLabel value="S" control={<Radio />} label="Seasoned Parent" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">I am having...</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" value={user['custom:childGender']} onChange={() => { }}>
                    <FormControlLabel value="M" control={<Radio />} label="A boy" />
                    <FormControlLabel value="F" color="primary" control={<Radio />} label="A girl" />
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
                  onClick={(event) => handleUpdate(event)}
                  variant="contained"
                  color="primary"
                  disabled
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
