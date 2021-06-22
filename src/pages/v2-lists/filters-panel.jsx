import React from "react";
import {
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
  Tooltip,
  Slider,
  FormHelperText,
  IconButton,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@material-ui/core';
import {
  Tune
} from '@material-ui/icons';
import validator from 'validator';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './my-lists.css'
import brands from '../../constants/brand'
import ages from '../../constants/ages';
import trimesters from '../../constants/pregnancy-timeline';
import categories from '../../constants/categories';

const FiltersPanel = ({
  sortBy,
  setSortBy,
  selectedStage,
  open,
  setOpen,
  setSelectedChip,
  selectedChip
}) => {

  return (
    <>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div style={{width: '350px', padding: '15px'}}>
          <h2>Sort items</h2>
          <FormControl variant="outlined" style={{width: '100%'}}>
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select
                labelId="sort-by-label"
                id="sort-by-label"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="isRecommended">Recommended</MenuItem>
                <MenuItem value="brand">Brand</MenuItem>
                <MenuItem value="age">Age</MenuItem>
              </Select>
            </FormControl>
            <hr style={{marginBottom: '30px', marginTop: '30px'}} />
            <h2>Filter items</h2>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={categories[selectedStage]}
              getOptionLabel={(option) => option.label}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Category"
                  placeholder="Category"
                />
              )}
            />
        </div>
      </Drawer>
    </>
  );
}

export default FiltersPanel;
