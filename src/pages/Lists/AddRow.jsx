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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grow,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './MyLists.css'
import brands from '../../constants/brand'
import ages from '../../constants/ages';

const AddRow = ({ row, categories, stages, index, setSelectedRow, selectedStage, selectedChip, onCancel, onSave, isNewRow }) => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(row);

  React.useEffect(() => {
    if (isNewRow) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, field, newVal) => {
    const value = newVal || e.target.value;
    setValues({ ...values, [field]: value });
  }

  const getSubCategories = () => {
    const categoryId = selectedChip === 0 ? values.categoryId : selectedChip;
    return categories[categoryId] ? categories[categoryId].subCategories.map(category => category) : [];
  }

  return (
    <Grow
      in={true}
      style={{ transformOrigin: '0 0 0' }}
      {...(true ? { timeout: 1000 } : {})}
    >
      <form onSubmit={(e) => onSave(values, e)} className="edit-row">
        <div className="col-2">
          <FormControl variant="outlined" className="field-container" size="small">
            <InputLabel id="life-stage-label">Life Stage</InputLabel>
            <Select
              labelId="life-stage-label"
              id="life-stage-input-label"
              value={selectedStage}
              onChange={(e) => handleChange(e, 'stageId')}
              label="Life Stage"
              size="small"
              disabled
            >
              {stages.map(stage => (
                <MenuItem key={stage.id} value={stage.id}>{stage.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" className="field-container" size="small">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-input-label"
              value={selectedChip === 0 ? values.categoryId : selectedChip}
              onChange={(e) => handleChange(e, 'categoryId')}
              label="Category Id"
              size="small"
              disabled={selectedChip !== 0}
              required
            >
              {categories.slice(1).map(category => (
                <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="col-6">
          <div className="standard-flex-box">
            <div className="col-6">
              <Autocomplete
                id="sub-category-input"
                freeSolo
                value={values.type}
                onChange={(e, newVal) => handleChange(e, 'type', newVal)}
                options={getSubCategories()}
                renderInput={(params) => (
                  <TextField {...params} label="Sub-Category" margin="normal" variant="outlined" size="small" onBlur={(e) => {handleChange(e, 'type')}} />
                )}
              />
            </div>

            <div className="col-6">
              <Autocomplete
                onChange={(e, newVal) => handleChange(e, 'brand', newVal)}
                id="brand-input"
                freeSolo
                value={values.brand}
                options={brands}
                getOptionLabel={option => typeof option === 'string' ? option : option}
                renderInput={(params) => (
                  <TextField {...params} label="Brand" margin="normal" variant="outlined" size="small" onBlur={(e) => {handleChange(e, 'brand')}} />
                )}
              />
            </div>
          </div>

          <TextField
            className="field-container"
            onChange={(e) => handleChange(e, 'item')}
            id="item-input"
            label="Item Name"
            variant="outlined"
            value={values.item}
            size="small"
            InputLabelProps={{ required: false }}
            required
          />

          <TextField
            className="field-container"
            onChange={(e) => handleChange(e, 'link')}
            id="link-input"
            label="Link"
            variant="outlined"
            value={values.link}
            size="small"
            InputLabelProps={{ required: false }}
            required
          />
        </div>

        <div className="col-3">
          <FormControl className="field-container" variant="outlined" size="small">
            <InputLabel id="age-label">Age</InputLabel>
            <Select
              labelId="age-label"
              id="age-input"
              value={values.age}
              onChange={(e) => handleChange(e, 'age')}
              label="Life Stage"
              size="small"
              required
            >
              {ages.map(age => (
                <MenuItem size="small" key={age} value={age}>{age}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl component="fieldset" className="field-container" size="small">
            <FormLabel component="legend">Do you recommend this item?</FormLabel>
            <RadioGroup
              aria-label="recommended"
              name="recommended"
              value={values.isRecommended}
              onChange={(e) => handleChange(e, 'isRecommended')}
              style={{ flexDirection: 'initial' }}
            >
              <FormControlLabel value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel value="N" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          <TextField
            className="field-container"
            id="outlined-multiline-flexible"
            label="Additional Comments"
            multiline
            rowsMax={4}
            value={values.comments}
            onChange={(e) => handleChange(e, 'comments')}
            variant="outlined"
            size="small"
          />
        </div>

        <div className="col-12 mt-15">
          <Button type="submit" variant="contained" color="primary">
            {row.item ? 'Save' : 'Add Item'}
          </Button>

          <Button onClick={onCancel} color="secondary">
            Cancel
        </Button>
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
              <strong>{values.brand} - {values.item}</strong>
              <br />
              <br />
          This item will not be officially deleted until you click the "Save" icon after deleting.
        </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
        </Button>

            <Button onClick={(e) => { handleChange(e, index, 'delete'); handleClose(); }} color="primary">
              Delete Item
        </Button>
          </DialogActions>
        </Dialog>

      </form>
    </Grow>
  );
}

export default AddRow;
