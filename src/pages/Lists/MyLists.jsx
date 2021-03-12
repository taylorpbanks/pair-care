import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { ActionCreators } from '../../redux/my-list/actions';
import {
  Box,
  AppBar,
  Tabs,
  Tab,
  Chip,
  Fab,
  Snackbar,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import {
  Close,
  Share,
  Add,
  LibraryAdd,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import './MyLists.css'
import ListRow from './ListRow';
import stages from '../../constants/stages';
import categories from '../../constants/categories';
import AddRow from './AddRow';
import AddManyItems from './AddManyItems';
import {
  createItem as createItemMutation,
  deleteItem as deleteItemMutation,
  updateItem as updateItemMutation,
} from '../../graphql/mutations';
import { listItems } from '../../graphql/queries';
import { Link as RouterLink } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { cloneDeep } from 'lodash';
import { compareStrings } from '../../tools/services';
import ProfilePic from '../Profile/ProfilePic';

function TabPanel(props) {
  const { children, selectedStage, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedStage !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {selectedStage === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  selectedStage: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyLists = ({
  sharedList,
  viewersList,
  myList,
  addMyList,
  profile,
  addItem,
  removeItem,
  changeItem,
}) => {
  const [selectedStage, setSelectedStage] = useState(2);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedChip, setSelectedChip] = useState(0);
  const [listContent, setListContent] = useState([]);
  //const [allLists, setAllListContent] = React.useState({});
  const [showSnackBar, setShowSnackBar] = useState(undefined);
  const [showManyItemAdd, setShowManyItemAdd] = useState(false);
  const [sortBy, setSortBy] = useState('isRecommended');

  useEffect(() => {
    document.title = 'Pair Care | My List';

    const mainListId = 2;
    if ((myList && myList[mainListId] && !myList[mainListId].length) || sharedList) {
      fetchList(mainListId);
    } else {
      const copy = cloneDeep(myList[mainListId]);
      setListContent(copy);
    }
  }, []);

  useEffect(() => {
    if (!sharedList) {
      setListContent(myList[selectedStage]);
    }
  }, [myList]);

  useEffect(() => {
    if (listContent && listContent.length) {
      const copy = cloneDeep(listContent);
      if (sortBy) {
        copy.sort(compareStrings('categoryId'));
      }
  
      copy.sort(compareStrings(sortBy, sortBy === 'isRecommended' ? 'desc' : 'asc'));
      setListContent(copy);
    }
  }, [sortBy]);

  async function fetchList(id) {
    const request = {
      stageId: { eq: id }
    };

    if (sharedList && sharedList.isPairCare) {
      request.email = {eq: 'paircarecontact@gmail.com'};
    } else {
      request.sub = {eq: sharedList ? sharedList.fromSub : profile.sub};
    }

    const apiData = await API.graphql(graphqlOperation(listItems, {filter: request, limit: 10000}));

    const { items } = apiData.data.listItems;

    if (sharedList && viewersList) {
      items.forEach(item => {
        item.added = viewersList.find(myItem =>  myItem.link === item.link);
      });
    }

    const sortedItems = items.sort(compareStrings('categoryId')).sort(compareStrings('isRecommended', 'desc'));
    if (!sharedList) {
      addMyList(sortedItems, id);
    }
    setListContent(sortedItems);
  }

  const emptyRow = {
    stageId: '',
    categoryId: '',
    type: '',
    brand: '',
    link: '',
    item: '',
    age: 0,
    toAge: 0,
    isRecommended: undefined,
    comments: ''
  }

  const handleChange = (event, newValue) => {
    setListContent([]);

    if (!myList[newValue].length || sharedList) {
      fetchList(newValue);
    } else {
      setListContent(myList[newValue]);
    }
    setSelectedStage(newValue);
    setSelectedChip(0);
  };

  async function createItem(item, e) {
    const requestItem = cloneDeep(item);
    e.preventDefault();

    if (requestItem.stageId === '') {
      requestItem.stageId = selectedStage;
    }

    if (requestItem.categoryId === '') {
      requestItem.categoryId = selectedChip;
    }

    requestItem.sub = profile.sub;
    requestItem.email = profile.email;
    requestItem.updatedAt = undefined;
    requestItem.createdAt = undefined;
    requestItem.added = undefined;
    requestItem.id = undefined;

    await API.graphql({ query: createItemMutation, variables: { input: requestItem } })
    .then(response => {
      let copyArray = [...listContent];

      requestItem.id = response.data.createItem.id;
      if (sharedList) {
        setShowSnackBar('Item added successfully to your list!');
        const index = copyArray.findIndex(listItem => listItem.id === item.id);
        copyArray[index].added = true;
      } else {
        setSelectedRow(null);
        setShowSnackBar('Item added successfully!');
      }
      addItem(requestItem, selectedStage);
    })
    .catch(() => {
      setShowSnackBar('An unexpected error occurred.  Please try again.');
    });
  }

  async function updateItem (item, e) {
    e.preventDefault();
    delete item.createdAt;
    delete item.updatedAt;

    await API.graphql({ query: updateItemMutation, variables: { input: item } })
    .then(() =>{
      setSelectedRow(null);
      changeItem(item, selectedStage, item.id);
      setShowSnackBar('Item updated successfully!');
    })
    .catch(() =>{
      setShowSnackBar('An unexpected error occurred.  Please try again.');
    });


  };

  async function deleteItem(id) {
    await API.graphql({ query: deleteItemMutation, variables: { input: { id } }}).then(() =>{
      setShowSnackBar('Item deleted successfully!');
      removeItem(id, selectedStage)
    })
    .catch(() => {
      setShowSnackBar('An unexpected error occurred.  Please try again.');
    });
  }

  const addEntryRow = () => {
    setSelectedRow(10000);
  }

  categories[selectedStage].forEach(category => {
    const numOfItems = listContent.filter((item) => item.categoryId === category.id);
    category.numOfItems = numOfItems.length;
  });

  categories[selectedStage][0].numOfItems = listContent.length;

  return (
    <div className="my-list-container">
      {!sharedList && (
        <div className="my-list-header">
          <img src={require("../../img/my-list-bg.jpg.png")} alt="list" style={{width: '100%'}} />
          <h1>
            <ProfilePic
              color={profile['custom:color']}
              user={profile}
              picture={profile['custom:pic']}
              sub={profile.sub}
              viewOnly
            />
            &nbsp;
            <span>My List</span>
          </h1>
        </div>
      )}

      <AppBar position="sticky">
        <Tabs value={selectedStage} onChange={handleChange} aria-label="simple tabs example" className="page-container">
          {stages.map(tab => (
            <Tab key={tab.label} label={tab.label} {...a11yProps(tab.id)} />
          ))}
        </Tabs>
      </AppBar>
      {stages.map(stage => (
        <TabPanel
          selectedStage={selectedStage}
          index={stage.id}
          key={stage.id}
          className={selectedRow === 10000 ? 'tab-panel page-container' : 'tab-panel append-btm-margin page-container'}
        >
          <FormControl variant="outlined" size="small" style={{float: 'right'}}>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by-label"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              size="small"
            >
              <MenuItem value="isRecommended">Recommended</MenuItem>
              <MenuItem value="brand">Brand</MenuItem>
              <MenuItem value="age">Age</MenuItem>
            </Select>
          </FormControl>

          <br />

          <div style={{display: 'inline'}}>
            {categories[selectedStage].map(list => (
              <Chip
                className="category-chip"
                color={selectedChip === list.id ? 'primary' : undefined}
                key={list.id}
                size="medium"
                icon={selectedChip === list.id && list.highlighted ? list.highlighted : list.icon}
                label={`${list.label} (${list.numOfItems})`}
                onClick={() => {
                  setSelectedChip(list.id)
                  if (selectedRow !== 10000) {
                    setSelectedRow(null);
                  }
                }}
              />
            ))}
          </div>

          <div className="mt-30">
            {categories[selectedStage][selectedChip].numOfItems > 0 && (
              <>
                {listContent.map((item, index) => (
                  <ListRow
                    key={`${item.id}-${index}`}
                    row={item}
                    stages={stages}
                    categories={categories[selectedStage]}
                    selectedChip={selectedChip}
                    index={index}
                    setSelectedRow={setSelectedRow}
                    selectedRow={selectedRow}
                    onDeleteItem={deleteItem}
                    updateItem={updateItem}
                    sharedList={sharedList}
                    createItem={createItem}
                  />
                ))}
              </>
            )}
            {(categories[selectedStage][selectedChip].numOfItems === 0 && !selectedRow) && (
              <div className="text-center">
                {!sharedList && (
                  <>
                    <h3>You currently don't have any items fitting this category.</h3>
                    <p>Start building your list!  Click the "Add" icon below to get started.</p>  
                  </>
                )}

                {sharedList && (
                  <>
                    <h3>{sharedList.fromName} has not added any items fitting this category.</h3>
                  </>
                )}
              </div>
            )}
          </div>
        </TabPanel>
      ))}

      {selectedRow === 10000 && (<AddRow
        row={emptyRow}
        stages={stages}
        categories={categories[selectedStage]}
        onCancel={() => setSelectedRow(null)}
        onSave={createItem}
        selectedStage={selectedStage}
        selectedChip={selectedChip}
        isNewRow={true}
      />)}

        {(selectedRow === null) && (
          <div className="floating-action-btn-container">
            <div className="middle-action-btns">
              {!sharedList && (
                <>
                  <Tooltip title="Add Item" aria-label="add item">
                    <Fab className="add-btn mr-15" color="primary" aria-label="add" disabled={!!selectedRow} onClick={() => {addEntryRow();}}>
                      <Add />
                    </Fab>
                  </Tooltip>

                  <Tooltip title="Share List" aria-label="share list">
                    <Fab className="share-btn" color="secondary" aria-label="share" disabled={!listContent.length} component={RouterLink} to="/share-my-list">
                      <Share />
                    </Fab>
                  </Tooltip>
                </>
              )}

              {sharedList && (
                <>
                  <Tooltip title="Add Many Items" aria-label="add many item">
                    <Fab className="add-btn mr-15" color="primary" aria-label="add" disabled={!listContent.length} onClick={() => {setShowManyItemAdd(true)}}>
                      <LibraryAdd />
                    </Fab>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
        )}

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

      {sharedList && showManyItemAdd && (
        <AddManyItems
          open={showManyItemAdd}
          setOpen={setShowManyItemAdd}
          list={listContent}
          shareInfo={sharedList}
          stages={stages}
          categories={categories}
          setListContent={setListContent}
        />
      )}
    </div >
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  myList: state.myList
});

const mapDispatchToProps = dispatch => {
  return {
    addMyList: (list, listId) => dispatch(ActionCreators.addMyList(list, listId)),
    addItem: (item, listId) => dispatch(ActionCreators.addItem(item, listId)),
    removeItem: (itemId, listId) => dispatch(ActionCreators.deleteItem(itemId, listId)),
    changeItem: (content, itemId, listId) => dispatch(ActionCreators.updateItem(content, itemId, listId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLists);
