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
import { Edit } from '@material-ui/icons';
import './MyLists.css'
import { Link } from 'react-router-dom';
import ListRow from './ListRow';
import stages from '../../constants/stages';
import mockContent from '../../constants/mockContent';
import categories from '../../constants/categories';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
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
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyLists = () => {
  const [value, setValue] = React.useState(2);
  const [selectedChip, setSelectedChip] = React.useState(0);
  const listContent = value === 2 ? mockContent : [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    //setSelectedChip(0);
  };

  categories[value].forEach(category => {
    const numOfItems = listContent.filter((item) => item.categoryId === category.id);
    category.numOfItems = numOfItems.length;
  });

  categories[value][0].numOfItems = listContent.length;
  const hasNoRecommendedItems = listContent.filter(row => row.isRecommended === 'Y' && (selectedChip === 0 || selectedChip === row.categoryId)).length === 0;
  const hasNoUnrecommendedItems =  listContent.filter(row => row.isRecommended === 'N' && (selectedChip === 0 || selectedChip === row.categoryId)).length === 0;

  return (
    <div>
      <h1>My List</h1>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          {stages.map(tab => (
            <Tab key={tab.label} label={tab.label} {...a11yProps(tab.id)} />
          ))}
        </Tabs>
      </AppBar>
      {stages.map(stage => (
        <TabPanel value={value} index={stage.id} key={stage.id}>
         {categories[value].map(list => (
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

          {categories[value][selectedChip].numOfItems > 0 && (
            <>
              <h3>Recommended</h3>
              {listContent.map((item, index) => (
                <ListRow
                  key={`${item.id}-${index}`}
                  row={item}
                  stages={stages}
                  categories={categories[value]}
                  selectedChip={selectedChip}
                  showRecommended={true}
                  index={index}
                />
              ))}
              {hasNoRecommendedItems ? (
                <p>You currently don't have any items fitting this category.  Click the "Edit" icon below to add more items.</p>
              ) : null}

              <h3 className="mt-30">Not Recommended</h3>
              {listContent.map((item, index) => (
                <ListRow
                  key={`${item.id}-${index}`}
                  row={item}
                  stages={stages}
                  categories={categories[value]}
                  selectedChip={selectedChip}
                  showRecommended={false}
                  index={index}
                />
              ))}
              {hasNoUnrecommendedItems ? (
                <p>You currently don't have any items fitting this category.  Click the "Edit" icon below to add more items.</p>
              ) : null}
            </>
          )}
          {categories[value][selectedChip].numOfItems === 0 && (
            <div className="text-center">
              <h3>You currently don't have any items fitting this category.</h3>
              <p>Start building your list!  Click the "Edit" icon below to get started.</p>
            </div>
          )}
        </TabPanel>
      ))}

      <div className="floating-action-container">
        <Link to="/my-list/edit">
          <Fab className="add-btn floating-action-btns" color="primary" aria-label="add">
            <Edit />
          </Fab>
        </Link>
      </div>
    </div >
  );
}

export default MyLists;
