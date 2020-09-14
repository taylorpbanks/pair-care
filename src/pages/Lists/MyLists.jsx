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
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Add } from '@material-ui/icons';
import './MyLists.css'
import ListRow from './ListRow';
import stages from '../../constants/stages';
import categories from '../../constants/categories';
import AddRow from './AddRow';
import {
  createItem as createItemMutation,
  deleteItem as deleteItemMutation,
  updateItem as updateItemMutation,
} from '../../graphql/mutations';
import { listItems } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

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

const MyLists = () => {
  const [selectedStage, setSelectedStage] = React.useState(2);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedChip, setSelectedChip] = React.useState(0);
  const [listContent, setListContent] = React.useState([]);
  const [allLists, setAllListContent] = React.useState({});
  const [showSnackBar, setShowSnackBar] = React.useState(undefined);


  React.useEffect(() => {
    fetchList(2);
  }, []);

  async function fetchList(id) {
    const apiData = await API.graphql(graphqlOperation(listItems, {filter: {
      stageId: { eq: id },
      sub: {eq: localStorage.sub}
    }}));

    setListContent(apiData.data.listItems.items);
    setAllListContent({...allLists, [`list${id}`]: apiData.data.listItems.items});
  }

  const emptyRow = {
    stageId: '',
    categoryId: '',
    type: '',
    brand: '',
    link: '',
    item: '',
    age: '',
    isRecommended: undefined,
    comments: ''
  }

  const handleChange = (event, newValue) => {
    if (!allLists[`list${newValue}`]) {
      fetchList(newValue);
    } else {
      setListContent(allLists[`list${newValue}`]);
    }
    setSelectedStage(newValue);
    setSelectedChip(0);
  };

  async function createItem(item, e) {
    e.preventDefault();

    if (item.stageId === '') {
      item.stageId = selectedStage;
    }

    if (item.categoryId === '') {
      item.categoryId = selectedChip;
    }

    item.sub = localStorage.sub;
    item.email = localStorage.email;

    await API.graphql({ query: createItemMutation, variables: { input: item } }).then(response => {
      let copyArray = [...listContent];
      item.id = response.data.createItem.id;

      copyArray.push(item);
      setListContent(copyArray);
      setSelectedRow(null);
      setAllListContent({...allLists, [`list${selectedStage}`]: undefined});
      setShowSnackBar('Item added successfully!');
    });
  }

  async function updateItem (item, e, index) {
    e.preventDefault();
    let copyArray = [...listContent];
    copyArray[index] = {...item};
    delete item.createdAt;
    delete item.updatedAt;

    await API.graphql({ query: updateItemMutation, variables: { input: item } });

    setListContent(copyArray);
    setSelectedRow(null);
    setAllListContent({...allLists, [`list${selectedStage}`]: undefined});
    setShowSnackBar('Item updated successfully!');
  };

  async function deleteItem(id) {
    const listCopy = listContent.filter(item => item.id !== id);
    setListContent(listCopy);
    await API.graphql({ query: deleteItemMutation, variables: { input: { id } }});
    setAllListContent({...allLists, [`list${selectedStage}`]: undefined});
    setShowSnackBar('Item deleted successfully!');
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
      <h1>My List</h1>
      <AppBar position="static">
        <Tabs value={selectedStage} onChange={handleChange} aria-label="simple tabs example">
          {stages.map(tab => (
            <Tab key={tab.label} label={tab.label} {...a11yProps(tab.id)} />
          ))}
        </Tabs>
      </AppBar>
      {stages.map(stage => (
        <TabPanel selectedStage={selectedStage} index={stage.id} key={stage.id}>
         {categories[selectedStage].map(list => (
            <Chip
              className="category-chip"
              color={selectedChip === list.id ? 'primary' : undefined}
              key={list.id}
              size="small"
              icon={list.icon}
              label={`${list.label} (${list.numOfItems})`}
              onClick={() => {setSelectedChip(list.id)}}
            />
          ))}

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
                  />
                ))}
              </>
            )}
            {(categories[selectedStage][selectedChip].numOfItems === 0 && !selectedRow) && (
              <div className="text-center">
                <h3>You currently don't have any items fitting this category.</h3>
                <p>Start building your list!  Click the "Add" icon below to get started.</p>
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

      <div className="text-center mt-15">
        <Fab className="add-btn" color="primary" aria-label="add" disabled={!!selectedRow} onClick={() => {addEntryRow();}}>
          <Add />
        </Fab>
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
    </div >
  );
}

export default MyLists;
