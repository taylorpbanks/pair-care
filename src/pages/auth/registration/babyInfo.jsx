import React from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  InputAdornment,
} from '@material-ui/core';
import {
  Cake,
  LocationOn,
} from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBaby,
  faChild,
  faVenus,
  faMars,
  faMagic,
} from '@fortawesome/free-solid-svg-icons'
import './registration.css';

const BabyInfo = ({ setStep, data, handleDataChange }) => {
  const isDisabled = () => {
    const maxZipCodeLength = 5;

    if (!data.childGender || !data.childBirthday || !data.parentType || !data.zipcode) {
      return true;
    }

    if (data.zipcode.length < maxZipCodeLength) {
      return true;
    }

    return false;
  };

  return (
    <Container maxWidth="lg">
      <p style={{ textAlign: 'left' }}>
        Tell us a little bit about you and your baby.
      </p>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12}>
            <h3>I am...</h3>
          </Grid>
          <Grid container spacing={3}>

            <Grid item xs={6} sm={6}>
              <Paper elevation={1} className={`option ${data.parentType === 'N' ? 'selected' : ''}`} onClick={() => { handleDataChange('parentType', 'N') }}>
                <div className="box-content">
                  New Parent
                  <br />
                  <FontAwesomeIcon icon={faBaby} size="2x" />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={6}>
              <Paper elevation={1} className={`option ${data.parentType === 'S' ? 'selected' : ''}`} onClick={() => { handleDataChange('parentType', 'S') }}>
                <div className="box-content">
                  Seasoned Parent
                  <br />
                  <FontAwesomeIcon icon={faChild} size="2x" />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid item xs={12}>
            <h3>It's...</h3>
          </Grid>
          <Grid container spacing={3}>

            <Grid item xs={6} sm={6}>
              <Paper elevation={1} className={`option ${data.childGender === 'M' ? 'selected' : ''}`} onClick={() => { handleDataChange('childGender', 'M') }}>
                <div className="box-content">
                  A Boy
                  <br />
                  <FontAwesomeIcon icon={faMars} size="2x" />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={6}>
              <Paper elevation={1} className={`option ${data.childGender === 'F' ? 'selected' : ''}`} onClick={() => { handleDataChange('childGender', 'F') }}>
                <div className="box-content">
                  A Girl
                  <br />
                  <FontAwesomeIcon icon={faVenus} size="2x" />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={6}>
              <Paper elevation={1} className={`option ${data.childGender === 'S' ? 'selected' : ''}`} onClick={() => { handleDataChange('childGender', 'S') }}>
                <div className="box-content">
                  A Surprise
              <br />
                  <FontAwesomeIcon icon={faMagic} size="2x" />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={6}>
              <Paper elevation={1} className={`option ${data.childGender === 'T' ? 'selected' : ''}`} onClick={() => { handleDataChange('childGender', 'T') }}>
                <div className="box-content">
                  More Than One
                  <br />
                  <FontAwesomeIcon icon={faBaby} size="2x" />
                  <FontAwesomeIcon icon={faBaby} size="2x" />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <hr className="mt-30 mb-30" />
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <TextField
            id="date"
            label="Birth date of my child/ren"
            type="date"
            onChange={(e) => { handleDataChange('childBirthday', e.target.value, {maxLength: 10}) }}
            variant="outlined"
            value={data.childBirthday}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Cake style={{ color: '#226d77' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            type="numeric"
            min="99999"
            id="zipcode"
            key="zipcode"
            name="zipcode"
            label="Zip Code"
            variant="outlined"
            placeholder="Zip Code"
            value={data.zipcode}
            onChange={(e) => { handleDataChange('zipcode', e.target.value, {maxLength: 5, numericOnly: true});}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn style={{ color: '#226d77' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button
          onClick={() => setStep(1)}
          variant="contained"
          color="primary"
          className="single-submit-btn"
          disabled={isDisabled()}
        >
          Continue
        </Button>
      </Grid>
    </Container>
  );
}

export default BabyInfo;
