import React from "react";
import {
  Fab,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Close, Save, Add, ExpandMore, Check } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './MyLists.css'
import EditRow from './EditRow';
import stages from '../../constants/stages';
import mockContent from '../../constants/mockContent';
import categories from '../../constants/categories';

const EditList = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedStage, setSelectedStage] = React.useState(2);
  const [list, setList] = React.useState(selectedStage === 2 ? mockContent : []);

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

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e, index, field) => {
    const copyList = [...list];
    if (field === 'delete') {
      copyList.splice(index, 1);
    } else {
      copyList[index][field] = e.target.value;
    }

    setList(copyList);
  }

  const addRow = () => {
    const copyList = [...list]
    copyList.push(emptyRow);
    setList(copyList);
  }

  const saveList = () => {
    console.log('save!');
  }

  React.useEffect(() => {
    setList(selectedStage === 2 ? mockContent : []);
  }, [selectedStage])

  return (
    <div className="mb-100">
      <h1>
        Edit List
        <br />
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleDropdownClick}>
          {stages.find(stage => stage.id === selectedStage).label} <ExpandMore />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleDropdownClose}
        >
          {stages.map(stage => (
            <MenuItem key={stage.id} onClick={() => {handleDropdownClose();setSelectedStage(stage.id);}}>
              {stage.label === selectedStage && <Check />}
              {stage.label}
            </MenuItem>
          ))}
        </Menu>
      </h1>

      <form onSubmit={saveList}>
        {list.map((item, index) => (
          <EditRow
            key={`${item.id}-${index}`}
            row={item}
            stages={stages}
            categories={categories[selectedStage]}
            index={index}
            handleChange={(e, index, field) => handleChange(e, index, field)}
          />
      ))}

      {!list.length && (
        <div className="text-center">
          <h3>You currently don't have any items fitting this category.</h3>
          <p>Start building your list!  Click the "Add" icon below to get started.</p>
        </div>
      )}

        <div className="floating-action-container">
          <Link to="/my-list">
            <Fab aria-label="Close">
              <Close />
            </Fab>
          </Link>

          <Fab aria-label="Save" type="submit" color="primary">
            <Save />
          </Fab>

          <Fab aria-label="Add" onClick={addRow} color="secondary">
            <Add />
          </Fab>
        </div>
      </form>
    </div >
  );
}

export default EditList;
