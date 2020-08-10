import React from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBaby,
  faChild,
  faVenus,
  faMars,
  faMagic,
  faUserFriends,

} from '@fortawesome/free-solid-svg-icons'
import './registration.css';

const BabyInfo = ({ setStep, data, handleDataChange }) => {
  return (
    <Container maxWidth="md">
      <p style={{ textAlign: 'left' }}>
        Tell us a little bit about your baby.
      </p>
      <h2>I am...</h2>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper elevation={1} className={`option ${data.parentType === 'N' ? 'selected' : ''}`} onClick={() => { handleDataChange('parentType', 'N') }}>
            New Parent
            <br />
            <FontAwesomeIcon icon={faBaby} size="2x" />
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper elevation={1} className={`option ${data.parentType === 'S' ? 'selected' : ''}`} onClick={() => { handleDataChange('parentType', 'S') }}>
            Seasoned Parent
            <br />
            <FontAwesomeIcon icon={faChild} size="2x" />
          </Paper>
        </Grid>
      </Grid>

      <h2>It's...</h2>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper elevation={1} className={`option ${data.childGender === 'M' ? 'selected' : ''}`} onClick={() => { handleDataChange('childGender', 'M') }}>
            A Boy
            <br />
            <FontAwesomeIcon icon={faMars} size="2x" />
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper elevation={1} className={`option ${data.childGender === 'F' ? 'selected' : ''}`} onClick={() => { handleDataChange('childGender', 'F') }}>
            A Girl
            <br />
            <FontAwesomeIcon icon={faVenus} size="2x" />
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper elevation={1} className={`option ${data.childGender === 'S' ? 'selected' : ''}`} onClick={() => { handleDataChange('childGender', 'S') }}>
            A Surprise
            <br />
            <FontAwesomeIcon icon={faMagic} size="2x" />
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper elevation={1} className={`option ${data.childGender === 'T' ? 'selected' : ''}`} onClick={() => { handleDataChange('childGender', 'T') }}>
            More Than One
            <br />
            <FontAwesomeIcon icon={faUserFriends} size="2x" />
          </Paper>
        </Grid>
      </Grid>

      <h2>The birth date of my child/ren</h2>
      <TextField
        id="date"
        aria-label="Birthday"
        type="date"
        onChange={(e) => { handleDataChange('childBirthday', e.target.value) }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <br />
      <br />

      <Grid style={{textAlign: 'center', marginTop: '30px'}}>
        <Button
          onClick={() => setStep(1)}
          variant="contained"
          color="primary"
          disabled={!data.childGender || !data.childBirthday || !data.parentType}
        >
          Continue
        </Button>
      </Grid>
    </Container>
  );
}

export default BabyInfo;
