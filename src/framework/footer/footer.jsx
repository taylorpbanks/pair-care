import React from "react";
import {
  Link,
  IconButton,
} from '@material-ui/core';
import {
  MailOutline,
  Instagram,
  Pinterest,
} from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './footer.css'

const useStyles = makeStyles({
  footer: {
    left: 0,
    bottom: 0,
    color: '#676868',
    'font-size': '12px',
    padding: '50px',
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
      <div style={{ marginBottom: '10px', marginTop: '10px'}}>
        <Link href="https://www.instagram.com/pair_care/" className="footer-link">
          <IconButton size="small" color="primary">
            <Instagram fontSize="small" />
          </IconButton>
        </Link>

        <Link href="https://www.pinterest.com/pair_care/" className="footer-link">
          <IconButton size="small" color="primary">
            <Pinterest fontSize="small" />
          </IconButton>
        </Link>

        <Link href="mailto:paircarecontact@gmail.com" className="footer-link">
          <IconButton size="small" color="primary">
            <MailOutline fontSize="small" />
          </IconButton>
        </Link>
      </div>

      <div className="pt-15">
        &copy; 2021 Pair Care
      </div>
    </div>
  );
}

export default Footer;
