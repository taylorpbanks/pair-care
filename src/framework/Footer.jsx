import React from "react";
import {
  Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './Footer.css'

const useStyles = makeStyles({
  footer: {
    left: 0,
    bottom: 0,
    color: '#676868',
    'font-size': '12px',
    padding: '30px',
    borderTop: '2px solid #eef6f9',
    textAlign: 'center',
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Link href="mailto:paircarecontact@gmail.com" className="footer-link">Contact Us</Link>
      <RouterLink to="/faq" className="footer-link">FAQs</RouterLink>
      <br />
      <br />
      <div className="pt-15">
        &copy; 2021 Pair Care
      </div>
    </div>
  );
}

export default Footer;
