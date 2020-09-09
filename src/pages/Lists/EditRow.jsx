import React from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextareaAutosize,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Delete } from '@material-ui/icons';
import './MyLists.css'
import brands from '../../constants/brand'
import ages from '../../constants/ages';

const EditRow = ({ row, categories, stages, handleChange, index, inViewMode }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="edit-row">
        {!inViewMode && (
          <div className="col-12">
            <span>Item {index + 1}</span>
            <IconButton aria-label="delete" onClick={(e) => {row.item ? handleClickOpen() : handleChange(e, index, 'delete');}}>
              <Delete />
            </IconButton>
          </div>
        )}
      <div className="col-2">
        <FormControl variant="outlined" className="field-container">
          <InputLabel id="life-stage-label">Life Stage</InputLabel>
          <Select
            labelId="life-stage-label"
            id="life-stage-input-label"
            value={row.stageId}
            onChange={(e) => handleChange(e, index, 'stageId')}
            label="Life Stage"
            required
          >
          {stages.map(stage => (
            <MenuItem key={stage.id} value={stage.id}>{stage.label}</MenuItem>
          ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className="field-container">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-input-label"
            value={row.categoryId}
            onChange={(e) => handleChange(e, index, 'categoryId')}
            label="Category Id"
            required
          >
          {categories.map(category => (
            <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>
          ))}
          </Select>
        </FormControl>

        <Autocomplete
          id="sub-category-input"
          freeSolo
          value={row.type}
          onChange={(e) => handleChange(e, index, 'type')}
          options={categories[row.categoryId] ? categories[row.categoryId].subCategories.map(category => category) : []}
          renderInput={(params) => (
            <TextField {...params} label="Sub-Category" margin="normal" variant="outlined" />
          )}
        />
      </div>

      <div className="col-6">
        <TextField
          className="field-container"
          onChange={(e) => handleChange(e, index, 'item')}
          id="item-input"
          label="Item Name"
          variant="outlined"
          value={row.item}
          required
        />

        <TextField
          className="field-container"
          onChange={(e) => handleChange(e, index, 'link')}
          id="link-input"
          label="Link"
          variant="outlined"
          value={row.link}
          required
        />

        <div className="standard-flex-box">
          <div className="col-8">
            <Autocomplete
              onChange={(e) => handleChange(e, index, 'brand')}
              id="brand-input"
              freeSolo
              value={row.brand}
              options={brands.map(brand => brand)}
              renderInput={(params) => (
                <TextField {...params} label="Brand" margin="normal" variant="outlined" />
              )}
            />
          </div>
          
          <div className="col-4">
            <FormControl className="field-container" variant="outlined">
              <InputLabel id="age-label">Age</InputLabel>
              <Select
                labelId="age-label"
                id="age-input"
                value={row.age}
                onChange={(e) => handleChange(e, index, 'age')}
                label="Life Stage"
                required
              >
              {ages.map(age => (
                <MenuItem key={age} value={age}>{age}</MenuItem>
              ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="col-3">
        <FormControl component="fieldset" className="field-container">
          <FormLabel component="legend">Do you recommend this item?</FormLabel>
          <RadioGroup
            aria-label="recommended"
            name="recommended" 
            value={row.isRecommended}
            onChange={(e) => handleChange(e, index, 'isRecommended')}
            style={{flexDirection: 'initial'}}
          >
            <FormControlLabel value="Y" control={<Radio />} label="Yes" />
            <FormControlLabel value="N"  control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset"  variant="outlined" className="field-container">
          <FormLabel component="legend">Comments?</FormLabel>
          <TextareaAutosize
            variant="outlined"
            aria-label="Additional Comments"
            rowsMin={6}
            maxLength="300"
            placeholder="Enter additional comments here"
            value={row.comments}
            onChange={(e) => handleChange(e, index, 'comments')}
          />
        </FormControl>
      </div>

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure you want to delete this item?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The following item will be deleted:
          <br />
          <strong>{row.brand} - {row.item}</strong>
          <br />
          <br />
          This item will not be officially deleted until you click the "Save" icon after deleting.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>

        <Button onClick={(e) => {handleChange(e, index, 'delete');handleClose();}} color="primary">
          Delete Item
        </Button>
      </DialogActions>
    </Dialog>
  
    </div>
  );
}

export default EditRow;
