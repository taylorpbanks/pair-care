import React, { useState, useRef, useEffect } from "react";
import { Auth, Storage } from 'aws-amplify';
import {
  Grid,
  Avatar,
  IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AddAPhoto } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
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

const ProfilePic = ({ color, user, picture, sub }) => {
  const classes = useStyles();
  const displayColor = color ? classes[color] : classes.purple;
  const [error, setError] = useState(undefined);
  const hiddenFileInput = useRef(null);
  const [pic, setPic] = useState(null);
  const errorMessage = 'An error has occurred when trying to upload your profile picture.';
  const initials = user['custom:firstName'] && user['custom:lastName'] ?
  user['custom:firstName'].charAt(0).toUpperCase() + user['custom:lastName'].charAt(0).toUpperCase() : '';

  useEffect(() => {
    if (picture) {
      Storage.get(picture).then(response => {
        setPic(response);
      });
    }
  }, [picture]);

  const savePicture = (key) => {
    Storage.get(key).then(picture => {
      const attribute =  { 'custom:pic': key };

      Auth.currentAuthenticatedUser()
      .then(currentUser => {
        Auth.updateUserAttributes(currentUser, attribute)
        .then(() => {
          setPic(picture);
        })
        .catch(err => setError(errorMessage));
      }).catch(err => setError(errorMessage));
    });
  };

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    await Storage.put(sub, file)
      .then(response => savePicture(response.key))
      .catch(() => setError(errorMessage));
  }

  return (
    <div className="upload-profile-pic">
      <Avatar
        src={pic}
        className={`${picture ? '' : displayColor} margin-auto`}>
        {picture ? null : initials}
      </Avatar>
      <IconButton color="primary" className="upload-btn" aria-label="upload picture" onClick={handleClick} component="span">
        <AddAPhoto fontSize="small" />
      </IconButton>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={onChange}
        style={{display: 'none'}}
      />

      {error && (
        <Grid item xs={12}>
          <Alert style={{ marginBottom: '15px' }} severity="error"><strong>{error}</strong> Please try again.</Alert>
        </Grid>
      )}
    </div>
  );
}

export default ProfilePic;
