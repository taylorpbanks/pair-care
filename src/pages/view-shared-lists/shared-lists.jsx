import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../redux/my-list/actions';
import { ActionCreators as actions } from '../../redux/share/actions';
import { useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Slide,
  Button,
  Avatar,
} from '@material-ui/core';
import { Storage } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { AccountCircle, ArrowForwardIos, InfoOutlined } from '@material-ui/icons';
import { listItems, listShareds } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import MyList from '../lists/my-lists';
import './shared-lists.css';

function SharedLists({
  profile,
  myList,
  addMyList,
  sharedLists,
  addWithMe,
}) {
  const [selected, setSelected] = useState(undefined);
  const [pictures, setPictures] = useState({});
  const location = useLocation().state;

  useEffect(() => {
    document.title = 'Pair Care | Shared Lists';
    if (myList && myList.all && !myList.all.length) {
      fetchList();
    }

    if (sharedLists && sharedLists.length <= 1) {
      fetchPeople();
    }

    const seePairCareList = location ? location.seePairCareList : false;
    if (seePairCareList) {
      setSelected(sharedLists[0]);
    }
  }, []);

  useEffect(() => {
    if (sharedLists) {
      const getPictureUrl = function getPicUrl(list) { // sample async action
        if (list.fromEmail !== 'paircarecontact@gmail.com') {
          return Storage.get(list.fromSub).then(response => {return {[list.fromSub]: response}});
        }
      };

      const actions = sharedLists.map(getPictureUrl); 
      const results = Promise.all(actions);

      results.then(data => {
        setPictures(data.reduce(((r, c) => Object.assign(r, c)), {}));
      });
    }
  }, [sharedLists]);

  async function fetchList() {
    const apiData = await API.graphql(graphqlOperation(listItems, {
      filter: {
        sub: {eq: profile.sub}
      },
      limit: 10000
    }));

    const { items } = apiData.data.listItems;
    addMyList(items);
  }

  async function fetchPeople() {
    const apiData = await API.graphql(graphqlOperation(listShareds, {
      filter: {
        toEmail: { eq: profile.email }
      },
      limit: 10000,
    }));

    const { items } = apiData.data.listShareds;
    addWithMe( items );
  }

  return (
    <div className="shared-list-parent">
      {!selected && (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <div style={{position: 'relative'}}>
            <div className="shared-list-container page-container">
              <h1>Lists Shared With Me</h1>
              <h3>You currently have <strong className="secondary-color">{sharedLists ? sharedLists.length : 0}</strong> list{sharedLists && sharedLists.length === 1 ? '' : 's'} shared with you.</h3>
              <div>
                <h3>People sharing with you</h3>
                {sharedLists && sharedLists.length > 0 && (
                  <List component="nav" className="list-container" aria-label="contacts">
                    {sharedLists.map((list) => (
                      <ListItem key={list.id || 'paircare'} button onClick={() => setSelected(list)}>
                        <ListItemIcon>
                          {pictures[list.fromSub] || list.fromEmail === 'paircarecontact@gmail.com' ? 
                              <Avatar src={list.fromEmail === 'paircarecontact@gmail.com' ? require("../../img/pc-icon.png") : pictures[list.fromSub]} />
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

                {sharedLists && !sharedLists.length && (
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
            <h1 className="mb-30 avatar-header">
              {pictures[selected.fromSub] || selected.fromEmail === 'paircarecontact@gmail.com' ? 
                <Avatar src={selected.fromEmail === 'paircarecontact@gmail.com' ? require("../../img/pc-icon.png") : pictures[selected.fromSub]} className="shared-list-avatar" />
                :
                <AccountCircle fontSize="large" />
              }
              <span>
                &nbsp;&nbsp;
                {selected.fromName}{selected.fromName.charAt(selected.fromName.length-1) === 's' ? '\'' : '\'s'} Picks
                <br />
                <Button style={{padding: '0 15px'}} color="primary" onClick={() => setSelected(null)}>
                  &#8249; Back to All Lists
                </Button>
              </span>
            </h1>
            <MyList sharedList={selected} viewersList={myList.all} />
          </div>
        </Slide>
      )}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    myList: state.myList,
    sharedLists: state.share.withMe,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addMyList: (list, listId) => dispatch(ActionCreators.addMyList(list, 'all')),
    addWithMe: (people) => dispatch(actions.addWithMe(people)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharedLists);