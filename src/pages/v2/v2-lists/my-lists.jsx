import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/my-list/actions';
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
  CircularProgress,
  Toolbar,
} from '@material-ui/core';
import {
  Close,
  Share,
  Add,
  LibraryAdd,
  FiberManualRecord,
  Tune,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import './my-lists.css'
import ItemCard from './item-card';
import stages from '../../../constants/stages';
import categories from '../../../constants/categories';
import AddRow from './add-row';
import AddManyItems from './add-many-items';
import {
  createItem as createItemMutation,
  deleteItem as deleteItemMutation,
  updateItem as updateItemMutation,
} from '../../../graphql/mutations';
import { listItems } from '../../../graphql/queries';
import { Link as RouterLink } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { cloneDeep } from 'lodash';
import { compareStrings } from '../../../tools/services';
import ProfilePic from '../../profile/profile-pic';
import FiltersPanel from './filters-panel';
import AddItemForm from './add-item-form';

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

const MyListsV2 = ({
  sharedList,
  viewersList,
  myList,
  addMyList,
  profile,
  addItem,
  removeItem,
  changeItem,
  following,
  followers,
}) => {
  const [selectedStage, setSelectedStage] = useState(2);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedChip, setSelectedChip] = useState(0);
  const [listContent, setListContent] = useState([]);
  //const [allLists, setAllListContent] = React.useState({});
  const [showSnackBar, setShowSnackBar] = useState(undefined);
  const [showManyItemAdd, setShowManyItemAdd] = useState(false);
  const [sortBy, setSortBy] = useState('isRecommended');
  const [open, setOpen] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);

  const followingCount = following ? following.length : 1;
  const followersCount = followers ? followers.length : 1;

  useEffect(() => {
    document.title = 'Pair Care | My List V2';

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
        <div style={{textAlign: 'center', backgroundColor: '#eef6f9'}} className="pb-15 pt-15">
          <ProfilePic
            color={profile['custom:color']}
            user={profile}
            picture={profile['custom:pic']}
            sub={profile.sub}
            viewOnly
          />

          <h1 style={{margin: '15px'}}>
            {profile['custom:firstName']} {profile['custom:lastName']}
          </h1>
          <div style={{fontWeight: '500'}}>
            <RouterLink to="/share-my-list">{followersCount} Followers</RouterLink> &#183; <RouterLink to="shared-lists">{followingCount} Following</RouterLink>
          </div>
        </div>
      )}
      

      <AppBar position="sticky">
        <Toolbar>
          <Tabs value={selectedStage} onChange={handleChange} aria-label="simple tabs example" className="page-container">
            {stages.map(tab => (
              <Tab key={tab.label} label={tab.label} {...a11yProps(tab.id)} />
            ))}
          </Tabs>
          <IconButton edge="end" style={{color: 'white'}} onClick={() => setIsAdding(!isAdding)}>
            <Add />
          </IconButton>
          <IconButton edge="end" style={{color: 'white'}} onClick={() => setOpen(!open)}>
            <Tune />
          </IconButton>
          <FiltersPanel
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedStage={selectedStage}
            open={open}
            setOpen={setOpen}
          />
        </Toolbar>
      </AppBar>
      {stages.map(stage => (
        <TabPanel
          selectedStage={selectedStage}
          index={stage.id}
          key={stage.id}
          className={selectedRow === 10000 ? 'tab-panel page-container' : 'tab-panel append-btm-margin'}
        >

          <div className="standard-flex-box mt-30">
            {categories[selectedStage][selectedChip].numOfItems > 0 && (
              <>
                {listContent.map((item, index) => (
                  <ItemCard
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

        <AddItemForm isOpen={isAdding} onClose={() => setIsAdding(false)} />

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
  myList: state.myList,
  following: state.share.withMe,
  followers: state.share.withThem,
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
)(MyListsV2);
