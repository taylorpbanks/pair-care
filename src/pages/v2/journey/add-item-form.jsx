import React, { useEffect, useState } from "react";
import {
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  IconButton,
  CircularProgress,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import {
  Tune,
  ChevronRight,
  ChevronLeft,
  AddCircleOutline
} from '@material-ui/icons';
import categories from '../../../constants/categories';
import { API, graphqlOperation } from 'aws-amplify';
import { cloneDeep } from 'lodash';
import axios from 'axios';
import './add-item-form.css';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/my-list/actions';
import {
  createItem as createItemMutation
} from '../../../graphql/mutations';

const AddItemForm = ({
  isOpen,
  onClose,
  item,
  defaultIcon,
  categoryId,
  profile,
  myList,
  addItem
}) => {
  const [form, setForm] = useState({
    link: ''
  });
  const defaultContent = {
    stageId: '',
    categoryId: '',
    type: '',
    brand: '',
    link: '',
    item: '',
    age: 0,
    toAge: 0,
    isRecommended: undefined,
    comments: '',
    imgs: [],
    submitted: false
  }
  const [imgPreview, setImgPreview] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const [data, setData] = useState(defaultContent);
  const [checked, setChecked] = useState(true);

  const getImgPreview = (e) => {
    const { value } = e.target;
    if (value && value.length) {
      setIsLoading(true);
      setIndex(0);
      const api = ' https://5vri05j6qj.execute-api.us-east-2.amazonaws.com/staging';
      setForm({ link: value })

      axios
        .post(api, { link: value })
        .then((response) => {
          const { data } = response
          setData({
            ...data,
            item: data?.body?.title,
            imgs: data?.body?.images,
            submitted: true
          })
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  };

  async function addingItem() {
    const content = {
      stageId: 2,
      categoryId: categoryId,
      type: item.type,
      brand: '',
      link: form.link,
      item: data.item,
      age: 0,
      toAge: 0,
      isRecommended: 'true',
      comments: '',
      image: checked && data.imgs[index] ? data.imgs[index] : null
    }
    const requestItem = cloneDeep(content);

    requestItem.sub = profile.sub;
    requestItem.email = profile.email;
    requestItem.updatedAt = undefined;
    requestItem.createdAt = undefined;
    requestItem.added = undefined;
    requestItem.id = undefined;

    await API.graphql({ query: createItemMutation, variables: { input: requestItem } })
    .then(response => {
      let copyArray = [{...content}];

      requestItem.id = response.data.createItem.id;
      addItem(requestItem, 2);
      clear();
    })
    .catch((error) => {
      console.log(error)
      setError('An unexpected error occurred.  Please try again.');
    });
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const clear = () => {
    setForm({ link: '' });
    setData(defaultContent);
    onClose(false);
  }

  if (!item) return null

  const { suggestions } = item

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="sm"
      >
        <DialogTitle className="pb-0" id="alert-dialog-title">
          <Avatar aria-label="crib" style={{ backgroundColor: '#226d77', display: 'inline-flex', marginRight: '15px' }}>
            {item.icon || defaultIcon}
          </Avatar>
          Add {item.title}
        </DialogTitle>
        <DialogContent>
          <div style={{ margin: 'auto', passing: '15px 60px' }}>
            <DialogContentText id="alert-dialog-description">
              <TextField
                className="field-container mb-30"
                onChange={(e) => getImgPreview(e)}
                id="link-input"
                label="Link to Purchase"
                variant="outlined"
                value={form.link}
                size="small"
                InputLabelProps={{ required: true }}
                autoComplete="false"
                required
              />
            </DialogContentText>
            <DialogContentText>
              <div className="standard-flex-box">
                <div className="col-12">
                  <TextField
                    className="field-container mb-30"
                    onChange={(e) => setData({ ...data, item: e.target.value })}
                    id="link-input"
                    label="Item Name"
                    variant="outlined"
                    value={data.item}
                    size="small"
                    InputLabelProps={{ required: true }}
                    autoComplete="false"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="col-12 text-center">
                  <h5>
                    Image Preview
                    <Tooltip
                      title="We do our best to pull a preview image of your item based off the link you provide.  No worries if we can't find it, we will still save your data!"
                      aria-label="Information about image previews"
                      style={{
                        verticalAlign: 'middle',
                        width: '0.8em'
                      }}
                    >
                      <InfoOutlined size="small" color="primary" />
                    </Tooltip>
                  </h5>
                  {!isLoading && !data?.submitted && <p><i>[Pending]</i></p>}
                  {!data?.imgs?.length && data?.submitted && <p>Sorry, we were unable to grab an image preview.</p>}
                  {data?.imgs?.length !== 0 && data?.imgs[index] && (
                    <>
                      {data.imgs.length > 1 && index !== 0 && <IconButton onClick={() => setIndex(index - 1)}><ChevronLeft /></IconButton>}
                      <img src={data.imgs[index]} alt="img preview" style={{ width: '30%' }} />
                      {data.imgs.length > 1 && index !== data.imgs.length - 1 && <IconButton onClick={() => setIndex(index + 1)}><ChevronRight /></IconButton>}
                      {data.imgs.length > 1 && <p>Don't see the right preview for your link? <br /> Use the arrows.</p>}
                      <p>{index + 1} / {data.imgs.length}</p>
                    </>
                  )
                  }
                  {isLoading && <CircularProgress />}
                  <FormControlLabel control={<Checkbox onChange={handleChange} checked={checked} />} label="This is the correct image" />
                </div>
              </div>
            </DialogContentText>
          </div>

          <DialogActions>
            <Button onClick={(e) => { clear() }} color="primary" autoFocus>
              Cancel
            </Button>

            <Button onClick={(e) => { addingItem() }} color="primary" disabled={form.link === '' || data.item === ''}>
              Add
            </Button>
          </DialogActions>

          {suggestions && (
            <div>
              <hr />
              <h5>Quick Adds</h5>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '130px', display: 'inline-block', textAlign: 'center', margin: '0px 30px' }}>
                  <a href="https://www.westelm.com/products/hudson-3-drawer-changing-table-h9028/?pkey=cchanging-tables">
                    <img style={{ width: '100%' }} src={require('../../../img/concept/changing-table-1.jpg')} />
                    <br />
                    West Elm - Babyletto Hudson
                  </a>
                  <br />
                  <AddCircleOutline color="secondary" style={{ cursor: 'pointer' }} />
                </div>
                <div style={{ width: '130px', display: 'inline-block', textAlign: 'center', paddingLeft: '5px', margin: '0px 30px' }}>
                  <a href="https://www.wayfair.com/Little-Seeds--Monarch-Hill-Hawken-Changing-Table-Dresser-5715407COM-L218-K~W002967088.html?refid=GX528880927665-W002967088&device=c&ptid=893049660391&network=g&targetid=pla-893049660391&channel=GooglePLA&ireid=51633606&fdid=1817&gclid=Cj0KCQiA_JWOBhDRARIsANymNOY0ans9q3LxR-ZPMVH0nsFaU2Q34jrnd4AY7rRpjKhVnlFvhrl07NUaAsX3EALw_wcB">
                    <img style={{ width: '100%' }} src={require('../../../img/concept/changing-table-2.jpg')} />
                    <br />
                    Wayfair - Monarch Hill Hawken
                  </a>
                  <br />
                  <AddCircleOutline color="secondary" style={{ cursor: 'pointer' }} />
                </div>
                <a href="#" style={{
                  width: '130px',
                  display: 'inline-block',
                  textAlign: 'center',
                  paddingLeft: '5px',
                  verticalAlign: 'top',
                  marginTop: '65px'
                }}>
                  Get more ideas ›
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  myList: state.myList
});

const mapDispatchToProps = dispatch => {
  return {
    addItem: (item, listId) => dispatch(ActionCreators.addItem(item, listId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItemForm);
