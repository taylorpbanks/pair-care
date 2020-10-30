import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Slide,
  Button,
  Avatar,
} from '@material-ui/core';
import { Storage } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { AccountCircle, ArrowForwardIos, InfoOutlined } from '@material-ui/icons';
import { listItems, listShareds } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import MyList from '../Lists/MyLists';
import './SharedLists.css';

function SharedLists() {
  const [selected, setSelected] = useState(undefined);
  const [myList, setMyList] = useState({});
  const [sharedLists, setSharedLists] = useState([]);
  const [pictures, setPictures] = useState({});

  useEffect(() => {
    fetchList();
    fetchPeople();
  }, []);

  useEffect(() => {
    sharedLists.forEach((list) => {
      Storage.get(list.fromSub)
        .then(response => {
          setPictures({...pictures, [list.fromSub]: response})
        });
    });
  }, [sharedLists]);

  console.log(pictures);

  async function fetchList() {
    const apiData = await API.graphql(graphqlOperation(listItems, {filter: {
      sub: {eq: localStorage.sub}
    }}));

    const { items } = apiData.data.listItems;
    setMyList(items);
  }

  async function fetchPeople() {
    const apiData = await API.graphql(graphqlOperation(listShareds, {filter: {
      toEmail: { eq: localStorage.email }
    }}));

    const { items } = apiData.data.listShareds;
    setSharedLists(items);
  }


  return (
    <div>
      {!selected && (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <div>
            <h1>Shared lists</h1>
            <h3>You currently have <strong className="secondary-color">{sharedLists.length}</strong> list{sharedLists.length === 1 ? '' : 's'} shared with you.</h3>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <h3>People sharing with you</h3>
                {sharedLists.length > 0 && (
                  <List component="nav" className="list-container" aria-label="contacts">
                    {sharedLists.map((list) => (
                      <ListItem key={list.id} button onClick={() => setSelected(list)}>
                        <ListItemIcon>
                          {pictures[list.fromSub] ? 
                              <Avatar src={pictures[list.fromSub]} />
                              :
                              <AccountCircle fontSize="large" />
                          }
                        </ListItemIcon>
                        <ListItemText primary={list.fromName} secondary={list.fromEmail} style={{wordBreak: 'word-break'}} />
                        <ListItemIcon>
                          <ArrowForwardIos />
                        </ListItemIcon>
                      </ListItem>
                    ))}
                  </List>
                )}

                {!sharedLists.length && (
                  <div className="list-container text-small">
                    <InfoOutlined fontSize="small" color="primary"/>
                    <div className="no-share-msg">No one is currently sharing their list with you.</div>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <img src={require("../../img/pc-shared.png")} alt="pair-care shared" style={{ maxWidth: '100%' }} />
                <p className="secondary-color text-center">Don't forget to <Link to="/share-my-list">share your list</Link> too!</p>
              </Grid>
            </Grid>
          </div>
        </Slide>
      )}

      {selected && (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <div>
            <h1 className="mb-0">
              {selected.fromName}{selected.fromName.charAt(selected.fromName.length-1) === 's' ? '\'' : '\'s'} Picks
            </h1>
            <div className="mb-30">
              <Button className="mb-15" color="primary" onClick={() => setSelected(null)}>
                &#8249; Back to All Lists
              </Button>
            </div>

            <MyList sharedList={selected} viewersList={myList} />
          </div>
        </Slide>
      )}
    </div>
  )
}

export default SharedLists;