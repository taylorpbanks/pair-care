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
  const pairCareContact = {
    fromEmail: 'paircarecontact@gmail.com',
    fromName: 'Pair Care',
    fromSub: '512bfff3-eb83-4645-864f-1e1f5f5b87fe'
  };

  const [selected, setSelected] = useState(undefined);
  const [myList, setMyList] = useState({});
  const [sharedLists, setSharedLists] = useState([pairCareContact]);
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
    items.unshift(pairCareContact);
    setSharedLists(items);
  }


  return (
    <div>
      {!selected && (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <div style={{position: 'relative'}}>
            <div className="shared-list-container">
              <h1>Lists Shared With Me</h1>
              <h3>You currently have <strong className="secondary-color">{sharedLists.length}</strong> list{sharedLists.length === 1 ? '' : 's'} shared with you.</h3>
              <div>
                <h3>People sharing with you</h3>
                {sharedLists.length > 0 && (
                  <List component="nav" className="list-container" aria-label="contacts">
                    {sharedLists.map((list) => (
                      <ListItem key={list.id || 'paircare'} button onClick={() => setSelected(list)}>
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
                    <p className="secondary-color text-center para-container">
                      Don't forget to <Link to="/share-my-list">share your list</Link> too!
                    </p>
                  </List>
                  )}

                {!sharedLists.length && (
                  <div className="list-container text-small">
                    <InfoOutlined fontSize="small" color="primary"/>
                    <div className="no-share-msg">No one is currently sharing their list with you.</div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <img src={require("../../img/stock1.jpg")} alt="stock" style={{ maxWidth: '100%' }} />
            </div>
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