import React from "react";
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

const MyLists = ({ sharedList, viewersList }) => {
  const [selectedStage, setSelectedStage] = React.useState(2);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedChip, setSelectedChip] = React.useState(0);
  const [listContent, setListContent] = React.useState([]);
  const [allLists, setAllListContent] = React.useState({});
  const [showSnackBar, setShowSnackBar] = React.useState(undefined);
  const [showManyItemAdd, setShowManyItemAdd] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('isRecommended');

  React.useEffect(() => {
    fetchList(2);
  }, []);

  React.useEffect(() => {
    const copy = cloneDeep(listContent);
    if (sortBy) {
      copy.sort(compareStrings('categoryId'));
    }

    copy.sort(compareStrings(sortBy, sortBy === 'isRecommended' ? 'desc' : 'asc'));
    setListContent(copy);
  }, [sortBy]);

  async function fetchList(id) {
    const apiData = await API.graphql(graphqlOperation(listItems, {filter: {
      stageId: { eq: id },
      sub: {eq: sharedList ? sharedList.fromSub : localStorage.sub}
    }}));

    const { items } = apiData.data.listItems;

    if (sharedList && viewersList) {
      items.forEach(item => {
        item.added = viewersList.find(myItem =>  myItem.link === item.link);
      });
    }

    const sortedItems = items.sort(compareStrings('categoryId')).sort(compareStrings('isRecommended', 'desc'));
    setListContent(sortedItems);
    setAllListContent({...allLists, [`list${id}`]: apiData.data.listItems.items});
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

    if (!allLists[`list${newValue}`]) {
      fetchList(newValue);
    } else {
      setListContent(allLists[`list${newValue}`]);
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

    requestItem.sub = localStorage.sub;
    requestItem.email = localStorage.email;
    requestItem.updatedAt = undefined;
    requestItem.createdAt = undefined;
    requestItem.added = undefined;
    requestItem.id = undefined;

    await API.graphql({ query: createItemMutation, variables: { input: requestItem } })
    .then(response => {
      let copyArray = [...listContent];

      if (sharedList) {
        setShowSnackBar('Item added successfully to your list!');
        const index = copyArray.findIndex(listItem => listItem.id === item.id);
        copyArray[index].added = true;
      } else {
        requestItem.id = response.data.createItem.id;
        copyArray.push(requestItem);
        setListContent(copyArray);
        setSelectedRow(null);
        setAllListContent({...allLists, [`list${selectedStage}`]: undefined});
        setShowSnackBar('Item added successfully!');
      }
    })
    .catch(() => {
      setShowSnackBar('An unexpected error occurred.  Please try again.');
    });
  }

  async function updateItem (item, e, index) {
    e.preventDefault();
    let copyArray = [...listContent];
    copyArray[index] = {...item};
    delete item.createdAt;
    delete item.updatedAt;

    await API.graphql({ query: updateItemMutation, variables: { input: item } })
    .then(() =>{
      setListContent(copyArray);
      setSelectedRow(null);
      setAllListContent({...allLists, [`list${selectedStage}`]: undefined});
      setShowSnackBar('Item updated successfully!');
    })
    .catch(() =>{
      setShowSnackBar('An unexpected error occurred.  Please try again.');
    });


  };

  async function deleteItem(id) {
    const listCopy = listContent.filter(item => item.id !== id);
    setListContent(listCopy);
    await API.graphql({ query: deleteItemMutation, variables: { input: { id } }}).then(() =>{
      setAllListContent({...allLists, [`list${selectedStage}`]: undefined});
      setShowSnackBar('Item deleted successfully!');
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
    <div>
      {!sharedList && (<h1>My List</h1>)}
      <AppBar position="sticky">
        <Tabs value={selectedStage} onChange={handleChange} aria-label="simple tabs example">
          {stages.map(tab => (
            <Tab key={tab.label} label={tab.label} {...a11yProps(tab.id)} />
          ))}
        </Tabs>
      </AppBar>
      {stages.map(stage => (
        <TabPanel selectedStage={selectedStage} index={stage.id} key={stage.id} className={selectedRow === 10000 ? '' : 'append-btm-margin'}>
          <FormControl variant="outlined" size="small">
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

          <div style={{display: 'inline'}}>
            {categories[selectedStage].map(list => (
              <Chip
                className="category-chip"
                color={selectedChip === list.id ? 'primary' : undefined}
                key={list.id}
                size="medium"
                icon={list.icon}
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
                  <Fab className="share-btn" color="secondary" aria-label="share" component={RouterLink} to="/share-my-list">
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

export default MyLists;
