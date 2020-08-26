import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import {
  Container,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const UpdatePicture = () => {
  const [fileName, setFileName] = useState(undefined);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    // setFileName({ image: file.name });
    await Storage.put(file.name, file);
  }

  return (
    <>
      <input
        type="file"
        onChange={onChange}
      /> 
    </>
  );
}

export default UpdatePicture;
