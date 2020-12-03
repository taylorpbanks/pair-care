import React, { useState } from "react";
import {
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  footer: {
    left: 0,
    bottom: 0,
    color: '#676868',
    'font-size': '12px',
    padding: '10px',
    borderTop: '2px solid #eef6f9',
    textAlign: 'center',
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      &copy; 2020 Paircare
      &nbsp;&nbsp;&nbsp;
      <Link href="mailto:paircarecontact@gmail.com">Contact Us</Link>
    </div>
  );
}

export default Footer;
