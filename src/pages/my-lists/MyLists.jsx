import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import {
  Container,
  TextField,
  Button,
  Box,
  Link,
  Grid
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

const lists = [
  { id: 0, label: 'On the Go', icon: <FontAwesomeIcon icon={faBaby} /> },
  { id: 1, label: 'Sleeping', icon: <FontAwesomeIcon icon={faBaby} /> },
  { id: 2, label: 'Feeding & Nursing', icon: <FontAwesomeIcon icon={faBaby} /> },
  { id: 3, label: 'Bath time', icon: <FontAwesomeIcon icon={faBaby} /> },
  { id: 4, label: 'Health & Safety', icon: <FontAwesomeIcon icon={faBaby} /> },
  { id: 5, label: 'Play & Learn', icon: <FontAwesomeIcon icon={faBaby} /> },
  { id: 6, label: 'Clothing', icon: <FontAwesomeIcon icon={faBaby} /> },
  { id: 7, label: 'Changing Station', icon: <FontAwesomeIcon icon={faBaby} /> },
  { id: 8, label: 'Cleaning Supplies', icon: <FontAwesomeIcon icon={faBaby} /> },
  { id: 9, label: 'For the Parent', icon: <FontAwesomeIcon icon={faBaby} /> },
];

const MyLists = () => {
  return (
    <div>
      <h1>My Lists</h1>

      {/* <Grid container spacing={3}>
        {lists.map((list) => (
          <Grid key={list.id} item xs={4} sm={2}>
            <div className="list">
              {list.icon}
              <br />
              {list.label}
            </div>
          </Grid>
        ))}
        </Grid> */}
    </div >
  );
}

export default MyLists;
