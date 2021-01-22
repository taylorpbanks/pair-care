import React, { useState, useEffect } from "react";
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { ActionCreators } from '../../redux/profile/actions';
import {
  Container,
  TextField,
  Button,
  Grid,
  InputAdornment,
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
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import './Profile.css';
import ProfilePic from './ProfilePic.jsx';

const Profile = ({ profile, updateUser }) => {
  const [error, setError] = useState(undefined);
  const [confirmation, setConfirmation] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [data, setData] = useState({});

  useEffect(() => {
    setUser(profile);
    setData(profile);
  }, [profile]);

  const handleDataChange = (id, value, rules) => {
    if (rules && value) {
      if (rules.maxLength && value.length <= rules.maxLength) {
        const { numericOnly } = rules;
        const onlyDigits = /^\d*$/;

        if (numericOnly && onlyDigits.test(value)) {
          setData({ ...data, [id]: value });
        } else if (!numericOnly) {
          setData({ ...data, [id]: value });
        }
      }      
    } else if (!rules) {
      setData({ ...data, [id]: value });
    }
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
          updateUser({...changedFields()});
        })
        .catch(err => setError(err.message))
        .finally(() => window.scrollTo(0, 0));
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
      <Container maxWidth="sm" className="parent page-container">
        <h1>Account Profile</h1>
        {user && (
          <form onSubmit={handleUpdate}>
            <Grid container spacing={3}>
              <Grid item xs={12} className="text-center">
                <ProfilePic
                  color={user['custom:color']}
                  user={user}
                  picture={data['custom:pic']}
                  sub={user.sub}
                />
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
                <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                  <DatePicker
                    value={data['custom:yearOfBirth'] || null}
                    views={["year"]}
                    variant="outlined"
                    label="Year of birth (optional)"
                    onChange={(e) => { handleDataChange('custom:yearOfBirth', e) }}
                    inputVariant="outlined"
                    helperText="If you have multiple children we recommend you use the year of your oldest child"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Cake style={{ color: '#226d77' }} />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Year of Birth"
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="zipcode"
                  key="zipcode"
                  name="zipcode"
                  label="Zip Code"
                  type="zipcode"
                  onChange={(e) => { handleDataChange('custom:zipcode', e.target.value, {maxLength: 5, numericOnly: true}); setError(undefined); }}
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
                  <FormLabel component="legend">I am...</FormLabel>
                  <RadioGroup
                    aria-label="parent"
                    name="parent"
                    value={data['custom:parentType'] || user['custom:childGender']}
                    onChange={(e) => { handleDataChange('custom:parentType', e.target.value) }}
                  >
                    <FormControlLabel value="H" control={<Radio />} label="Hoping to become a parent" />
                    <FormControlLabel value="N" control={<Radio />} label="A New Parent" />
                    <FormControlLabel value="S" control={<Radio />} label="A Seasoned Parent" />
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

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (attributes) => dispatch(ActionCreators.updateProfile(attributes)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
