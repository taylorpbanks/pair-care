import React, { useState } from "react";
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
  Chip,
  CircularProgress
} from '@material-ui/core';
import {
  Tune,
  ChevronRight,
  ChevronLeft
} from '@material-ui/icons';
import validator from 'validator';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './my-lists.css'
import brands from '../../../constants/brand'
import ages from '../../../constants/ages';
import trimesters from '../../../constants/pregnancy-timeline';
import categories from '../../../constants/categories';
import { API } from 'aws-amplify';
import axios from 'axios';

const AddItemForm = ({
  isOpen,
  onClose
}) => {
  const [form, setForm] = useState({
    link: ''
  });
  const [imgPreview, setImgPreview] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getImgPreview = (e) => {
    const { value } = e.target;
    setIsLoading(true);
    const api = ' https://5vri05j6qj.execute-api.us-east-2.amazonaws.com/staging';
    setForm({link: value})

    axios
    .post(api, { link: value })
    .then((response) => {
      const { data } = response
      if (data?.body?.images?.length) {
        setImgPreview(data.body.images)
      }
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false)
    })
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              className="field-container mb-30"
              onChange={(e) => getImgPreview(e)}
              id="link-input"
              label="Link to Purchase"
              variant="outlined"
              value={form.link}
              size="small"
              InputLabelProps={{ required: false }}
              autoComplete="false"
              required
            />
          </DialogContentText>
          <DialogContentText>
            <h5>Image Preview</h5>
            {imgPreview.length !== 0 && imgPreview[index] && (
              <>
                {imgPreview.length > 1 && index !== 0 && <IconButton onClick={() => setIndex(index - 1)}><ChevronLeft /></IconButton>}
                <img src={imgPreview[index]} alt="img preview" style={{width: '200px'}} />
                {imgPreview.length > 1 && index !== imgPreview.length - 1 && <IconButton onClick={() => setIndex(index + 1)}><ChevronRight /></IconButton>}
                {imgPreview.length > 1 && <p>Don't see the right preview for your link? <br /> Use the arrows.</p>}
                <br />
                {index + 1} / {imgPreview.length}
              </>
            )
            }
            { isLoading && <CircularProgress /> }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {onClose(false);setForm({link: ''})}} color="primary" autoFocus>
            Cancel
          </Button>

          <Button onClick={(e) => { onClose(false); }} color="primary">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddItemForm;
