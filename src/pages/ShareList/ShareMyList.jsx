import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Chip,
  Snackbar,
  IconButton
} from '@material-ui/core';
import { Person, Close, InfoOutlined } from '@material-ui/icons';
import './ShareMyList.css';

function ShareMyList() {
  const [showSnackBar, setShowSnackBar] = React.useState(undefined);
  const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
  const emptyDataObj = {name: '', email: ''}

  const mockList = [];
  const [people, setPeople] = useState(mockList);
  const [data, setData] = useState(emptyDataObj)

  const addEmail = (e) => {
    e.preventDefault();

    const peopleArrayCopy = [...people];
    peopleArrayCopy.push(data);
    setPeople(peopleArrayCopy);
    setShowSnackBar(`You have successfully shared your list with ${data.name}.`)
    setData(emptyDataObj);
  }

  const handleDataChange = (field, value) => {
    setData({...data, [field]: value})
  }

  const deletePerson = (person) => {
    const peopleArrayCopy = people.filter(people => people.email !== person.email);
    setPeople(peopleArrayCopy);
    setShowSnackBar(`You have successfully unshared your list with ${person.name}.`)
  };

  return (
    <div>
      <h1>Share my list</h1>
      <p>You're helping to make it easier for other parents one list at a time!</p>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img src={require("../../img/pc-share.png")} alt="pair-care share" style={{ maxWidth: '100%' }} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <form className="mt-30" onSubmit={(e) => {addEmail(e)}}>
            <h3 className="mb-0">Add new person to share with</h3>
            <TextField
              id="name"
              label="Name"
              type="text"
              className="field-container"
              onChange={(e) => { handleDataChange('name', e.target.value) }}
              variant="outlined"
              InputLabelProps={{ required: false }}
              size="small"
              autoComplete="off"
              value={data.name}
              required
            />

            <TextField
              id="email"
              label="Email"
              type="text"
              className="field-container"
              onChange={(e) => { handleDataChange('email', e.target.value) }}
              variant="outlined"
              InputLabelProps={{ required: false }}
              inputProps={{ pattern: emailRegex }}
              size="small"
              autoComplete="off"
              value={data.email}
              required
            />
            {data.email !== '' && !data.email.match(emailRegex) && <span className="error-text">Enter a valid email address.</span>}

            <div className="mt-30">
              <Button variant="contained" color="primary" className="single-submit-btn" type="submit">
                Add
              </Button>
            </div>
          </form>

          <hr className="mt-30 mb-30" />

          <h3>People you are sharing with</h3>
          <div className="email-container">
            {!people.length && (
              <div className="text-small">
                <InfoOutlined fontSize="small" color="primary"/>
                <div className="no-share-msg">You are not currently sharing your list with anyone.</div>
              </div>
            )}

            {people.map((person, index) => (
              <Chip
                key={person.email}
                icon={<Person />}
                className="mr-5 mt-5"
                size="small"
                label={`${person.name} | ${person.email}`}
                onDelete={() => deletePerson(person)}
                color="secondary"
              />
            ))}
          </div>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal:'left' }}
        open={showSnackBar}
        onClose={() => {setShowSnackBar(undefined)}}
        message={showSnackBar}
        autoHideDuration={5000}
        key="bottomleft"
        severity="success"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => {setShowSnackBar(undefined)}}>
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
    />
    </div>
  )
}

export default ShareMyList;