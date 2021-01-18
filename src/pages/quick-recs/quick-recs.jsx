import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../redux/my-list/actions';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Snackbar,
  IconButton,
} from '@material-ui/core'
import {
  AddCircleOutline,
  ExpandMore,
  CheckCircleOutline,
  Close,
} from '@material-ui/icons';
import {
  createItem as createItemMutation,
} from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { cloneDeep } from 'lodash';
import { listItems } from '../../graphql/queries';
import recommendations from '../../constants/recommendations';
import './quick-recs.css';

function QuickRecs({ addItem }) {
  const [items, setItems] = useState([]);
  const [myList, setMyList] = useState([]);
  const [showSnackBar, setShowSnackBar] = React.useState(undefined);
  const pairCareSub = '512bfff3-eb83-4645-864f-1e1f5f5b87fe';

  useEffect(() => {
    fetchList(2, pairCareSub);
    if (localStorage.sub) {
      fetchList(2, localStorage.sub);
    }
  }, []);

  async function fetchList(listId, subId) {
    const apiData = await API.graphql(graphqlOperation(listItems, {filter: {
      stageId: { eq: listId },
      sub: {eq: subId}
    }}));

    const resp = apiData.data.listItems.items;
    subId === pairCareSub ? setItems(resp) : setMyList(resp);
  }

  const getUrl = (id) => {
    const item = items.find(item => item.id === id);
    return item ? item.link : '';
  };

  async function createItem(id, e) {
    const requestItem = cloneDeep(items.find(item => item.id === id));
    e.preventDefault();

    requestItem.sub = localStorage.sub;
    requestItem.email = localStorage.email;
    requestItem.updatedAt = undefined;
    requestItem.createdAt = undefined;
    requestItem.added = undefined;
    requestItem.id = undefined;

    await API.graphql({ query: createItemMutation, variables: { input: requestItem } })
    .then(response => {
      myList.push(requestItem);
      addItem(requestItem, 2);
      setShowSnackBar('Item added successfully to your list!');
    })
    .catch(() => {
      setShowSnackBar('An unexpected error occurred.  Please try again.');
    });
  }

  const isItemOnList = (item) => {
    return myList.find(myItem => myItem.link === getUrl(item.id));
  }

  return (
    <div className="quick-recs">
      <h1>Quick Recommendations</h1>
      <p className="mb-30">Item recommendations to meet the need for all types of parents and children.</p>

      {recommendations.map(r => (
        <Accordion key={r.title}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3 className="a-title">{r.title}</h3>
            <div className="a-img-container">
              {r.items.map((item, index) => <img style={{height: '75px'}} src={item.img} alt="pacifier" key={`img-${index}`} /> )}
            </div>
          </AccordionSummary>
          <AccordionDetails className="standard-flex-box">
            {r.items.map(item => (
              <Card className="col-2 item-box" variant="outlined" key={item.id}>
                <div className="item-title">
                  {item.label}
                </div>

                <div className="view-link-container">
                  <a href={getUrl(item.id)} target="_blank" rel="noopener noreferrer">
                    <img className="item-img" src={item.img} alt="pacifier" />
                    <br />
                    <div>View Item</div>
                  </a>
                </div>

                {localStorage.sub && (
                  <div
                    className={`mt-30 ${isItemOnList(item) ? 'success-color' : 'secondary-color'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => isItemOnList(item) ? e.preventDefault() : createItem(item.id, e)}
                  >
                    <div className="add-icon">
                      {isItemOnList(item) ? <CheckCircleOutline size="small" /> : <AddCircleOutline size="small" />}
                    </div>
                    <div className="add-label">
                      {isItemOnList(item) ?
                      ' Item is on Your List' :
                      ' Add Item to Your List'}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal:'left' }}
        open={showSnackBar}
        onClose={() => {setShowSnackBar(undefined)}}
        message={showSnackBar}
        autoHideDuration={4000}
        key="bottomleft"
        severity="success"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => {setShowSnackBar(undefined)}}>
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  myList: state.myList
});

const mapDispatchToProps = dispatch => {
  return {
    addItem: (item, listId) => dispatch(ActionCreators.addItem(item, listId)),
    //removeItem: (itemId, listId) => dispatch(ActionCreators.deleteItem(itemId, listId)),
    //changeItem: (content, itemId, listId) => dispatch(ActionCreators.updateItem(content, itemId, listId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickRecs);