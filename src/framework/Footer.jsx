import React, { useState } from "react";
import {
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    'background-color': 'white',
    color: '#676868',
    'font-size': '12px',
    padding: '10px',
    visibility: 'hidden'
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <span style={{float: 'left'}}>
        &copy; 2020 Pair Care
      </span>
      <Link href="#">Privacy Policy</Link>&nbsp;|&nbsp;
      <Link href="#">Security</Link>&nbsp;|&nbsp;
      <Link href="#">Terms & Conditions</Link>
    </div>
  );
}

export default Footer;
