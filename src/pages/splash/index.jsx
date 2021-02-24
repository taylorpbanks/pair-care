import React, { useEffect } from 'react';
import { Button, Avatar, Card } from '@material-ui/core';
import { ActionCreators } from '../../redux/my-list/actions';
import { ActionCreators as actions } from '../../redux/share/actions';
import { Link, Redirect } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems, listShareds } from '../../graphql/queries';
import {
  ShareOutlined,
  ListAltOutlined,
  EmojiObjectsOutlined,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { compareStrings } from '../../tools/services';
import recommendations from '../../constants/recommendations';
import './index.css';

function Splash({
  profile,
  list,
  sharedLists,
  mySharedPeople,
  addMyList,
  addWithMe,
  addWithThem,
}) {
  const [redirect, setRedirect] = React.useState(undefined);
  const preList = list[0] ? list[0].length : 0;
  const pregList = list[1] ? list[1].length : 0;
  const babyList = list[2] ? list[2].length : 0;
  const totalList = preList + pregList + babyList;
  const numOfSharedWithYou = sharedLists ? sharedLists.length : 1;
  const numOfWhoISharedWith = mySharedPeople ? mySharedPeople.length : 1;

  useEffect(() => {
    document.title = 'Pair Care | Home'
    if (list[0] && !list[0].length) {
      fetchInfo(0);
    }

    if (list[1] && !list[1].length) {
      fetchInfo(1);
    }

    if (list[2] && !list[2].length) {
      fetchInfo(2);
    }

    if (sharedLists && !sharedLists.length) {
      fetchSharedLists();
    }

    if (mySharedPeople && !mySharedPeople.length) {
      fetchMySharedFriends();
    }
  }, []);

  async function fetchInfo(id) {
    const apiData = await API.graphql(graphqlOperation(listItems, {filter: {
      stageId: { eq:id },
      sub: {eq: profile.sub}
    }}));

    const { items } = apiData.data.listItems;
    const sortedItems = items.sort(compareStrings('categoryId')).sort(compareStrings('isRecommended', 'desc'));
    addMyList(sortedItems, id);
  };

  async function fetchSharedLists() {
    const apiData = await API.graphql(graphqlOperation(listShareds, {filter: {
      toEmail: { eq: profile.email }
    }}));

    const { items } = apiData.data.listShareds;
    addWithMe( items );
  }

  async function fetchMySharedFriends() {
    const apiData = await API.graphql(graphqlOperation(listShareds, {filter: {
      fromSub: { eq: profile.sub }
    }}));

    const { items } = apiData.data.listShareds;
    addWithThem(items);
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  const item1 = { title: recommendations[0].altTitle, details: recommendations[0].items[1] };
  const item2 = { title: recommendations[3].altTitle, details: recommendations[3].items[2] };
  const items = [item1, item2];

  const getUrl = (id) => {
    const item = items.find(item => item.details.id === id);
    console.log(item);
    return item ? item.details.link : '';
  };

  return (
    <div className="unauthorized">
      <div className="welcome-bar">
        <h1 className="p-15" style={{paddingBottom: '30px'}}>Hello {profile['custom:firstName']}!</h1>
        <div className="standard-flex-box page-container">
          <div className="col-2 text-center">
            <div className="primary-color">Items in your list</div>
            <br />
            <Avatar className="avatar tertiary-bg">
              {totalList}
            </Avatar>
            <br />
            <Button
              style={{ borderRadius: '50px' }}
              type="submit"
              variant="outlined"
              color="primary"
              component={Link}
              to="/my-list"
            >
              Add items
              </Button>
          </div>

          <div className="col-2 text-center">
            <div className="secondary-color">People sharing with you</div>
            <br />
            <Avatar className="avatar secondary-bg">
              {numOfSharedWithYou}
            </Avatar>
            <br />
            <Button
              style={{ borderRadius: '50px' }}
              type="submit"
              variant="outlined"
              color="secondary"
              component={Link}
              to="/shared-lists"
            >
              View shared lists
              </Button>
          </div>

          <div className="col-2 text-center">
            <div className="primary-color">How many you've shared with</div>
            <br />
            <Avatar className="avatar primary-bg">
              {numOfWhoISharedWith}
            </Avatar>
            <br />
            <Button
              style={{ borderRadius: '50px' }}
              type="submit"
              variant="outlined"
              color="primary"
              component={Link}
              to="/share-my-list"
            >
              Share my list
              </Button>
          </div>

          <div className="col-4">
            <h1>Pair Care's List</h1>
            <h2 className="subtext">
              Need help getting started or growing your list?  Check out our list.
            </h2>
            <Button
              style={{ borderRadius: '50px', color: 'white' }}
              type="submit"
              onClick={() => setRedirect('quick-recommendations')}
              variant="contained"
              color="primary"
              size="large"
            >
              View Pair Care List  &#8250;
              </Button>
          </div>
        </div>
      </div>
      <img
        src={require("../../img/stock5.png")}
        alt="pair-care welcome"
        style={{width: '100%'}}
      />
      <h2 style={{ marginBottom: '30px', marginTop: '30px', textAlign: 'center' }} className="page-container">Things to do</h2>
      <div className="standard-flex-box mb-30 page-container" style={{ textAlign: 'center' }}>
        <div className="col-4 ">
          <Link to="/my-list">
            <ListAltOutlined fontSize="large" color="secondary" className="icons-highlights" />
            <br />
            <div className="icons-text">Create</div>
          </Link>
          <p>Create a list of your own recommended items</p>
        </div>

        <div className="col-4">
          <Link to="/share-my-list">
            <ShareOutlined fontSize="large" color="secondary" className="icons-highlights" />
            <br />
            <div className="icons-text">Share</div>
          </Link>
          <p>Share your list with other parents</p>
        </div>

        <div className="col-4">
          <Link to="shared-lists">
            <EmojiObjectsOutlined fontSize="large" color="secondary" className="icons-highlights" />
            <br />
            <div className="icons-text">Get Inspired</div>
          </Link>
          <p>View lists shared with you</p>
        </div>
      </div>

      <div className="secondary-box">
        <div className="page-container standard-flex-box">
          <div className="col-6">
            <div className="item-container">
              {items.map(item => (
                <Card className="col-6 item-box" variant="outlined" key={item.details.id}>
                  <div className="item-title">
                    {item.title} {item.details.label}
                  </div>

                  <div className="view-link-container">
                    <a href={getUrl(item.details.id)} target="_blank" rel="noopener noreferrer">
                      <img className="item-img" src={item.details.img} alt="pacifier" />
                      <br />
                      <div>View Item</div>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="col-6">
            <h1>Discover new products</h1>
            <h2 className="subtext">Needs more ideas and items to add to your list?  Check out our quick recommendations.</h2>
            <Button
              style={{ borderRadius: '50px', color: 'white' }}
              type="submit"
              onClick={() => setRedirect('quick-recommendations')}
              variant="contained"
              color="secondary"
              size="large"
            >
              View more  &#8250;
              </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  list: state.myList,
  sharedLists: state.share.withMe,
  mySharedPeople: state.share.withThem,
});

const mapDispatchToProps = dispatch => {
  return {
    addMyList: (list, listId) => dispatch(ActionCreators.addMyList(list, listId)),
    addWithMe: (people) => dispatch(actions.addWithMe(people)),
    addWithThem: (people) => dispatch(actions.addWithThem(people)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);