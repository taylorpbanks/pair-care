import React from "react";
import {
  Box,
  AppBar,
  Tabs,
  Tab,
  Chip,
  Fab,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Add } from '@material-ui/icons';
import './MyLists.css'
import ListRow from './ListRow';
import stages from '../../constants/stages';
import mockContent from '../../constants/mockContent';
import categories from '../../constants/categories';
import AddRow from './AddRow';

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
  const [listContent, setListContent] = React.useState(selectedStage === 2 ? mockContent : []);

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
    setSelectedStage(newValue);
    setSelectedChip(0);
  };

  const addItem = (item) => {
    //TODO: add item service integration
    if (item.stageId === '') {
      item.stageId = selectedStage;
    }

    let copyArray = [...listContent];
    copyArray.push(item);
    setListContent(copyArray);

    //TODO: after add service is successful
    setSelectedRow(null);
  };

  const updateItem = (index, item) => {
    //TODO: update item service integration
    let copyArray = [...listContent];
    copyArray[index] = {...item};
    setListContent(copyArray);

    //TODO: after update service is successful
    setSelectedRow(null);
  };

  const onDeleteItem = (index) => {
    //TODO: integrate delete item service
    let copyArray = [...listContent];
    if (index > -1) {
      copyArray.splice(index, 1);
    }
    setListContent(copyArray);
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
                    onDeleteItem={onDeleteItem}
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
        onSave={addItem}
        selectedStage={selectedStage}
        selectedChip={selectedChip}
      />)}

      <div className="text-center">
        <Fab className="add-btn" color="primary" aria-label="add" disabled={!!selectedRow} onClick={() => {addEntryRow();}}>
          <Add />
        </Fab>
      </div>
    </div >
  );
}

export default MyLists;
