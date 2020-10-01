import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Grid,
  Card,
  CardHeader,
  Divider,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { CheckCircle } from '@material-ui/icons';
import { createItem } from '../../graphql/mutations';
import { API } from 'aws-amplify';
import { cloneDeep } from 'lodash';

//TODO: filter out items already appearing on your list

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    maxLength: 400,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function AddManyItems({
  open,
  setOpen,
  list,
  shareInfo,
  stages,
  categories,
  setListContent,
}) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(list.filter(l => !l.added));
  const [right, setRight] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function addItems() {
    setError(false);
    setLoading(true);

    const requests = [];
    right.forEach(item => {
      const requestItem = cloneDeep(item);
      requestItem.sub = localStorage.sub;
      requestItem.email = localStorage.email;
      requestItem.updatedAt = undefined;
      requestItem.createdAt = undefined;
      requestItem.added = undefined;
      requestItem.id = undefined;

      requests.push(API.graphql({ query: createItem, variables: { input: requestItem } }));
    });
  
    await Promise.all(requests).then(response => {
      const copyArray = [...list];

      right.forEach(item => {
        const index = copyArray.findIndex(listItem => listItem.id === item.id);
        copyArray[index].added = true;
      });

      setListContent(copyArray);
      setSuccess(true);
    }).catch(() => {
      setError(true);
    }).finally(() => {
      setLoading(false);
    });
  };

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          const stage = stages.find(category => category.id === value.stageId);
          const category = categories[value.stageId].find(category => category.id === value.categoryId);
          console.log(stage);
          console.log(category);

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.item} secondary={`${stage.label} - ${category.label}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Dialog
      open={open}
      onClose={() => {setOpen(false)}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={success ? 'sm' : 'lg'}
    >
      {!success && <DialogTitle id="alert-dialog-title">{"Add Items to Your List"}</DialogTitle>}
      <DialogContent>
        {success && (
          <div className="text-center">
            <h2>
              <CheckCircle style={{ verticalAlign: 'middle' }} /> Success!
            </h2>
            <p>These items have been added to your list.</p>

            <div className="mt-30 mb-30">
              <Button to="/my-lists" component={RouterLink} variant="contained" color="primary">View your list</Button>
              <Button to="/share-my-list" component={RouterLink} color="secondary">Share your list</Button>
            </div>
          </div>
        )}
        {!success && (
          <>
            {error && (
              <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                <Alert severity="error" className="mb-15"><strong>An unknown error has occurred when trying to add items to your list.</strong> Please try again.</Alert>
              </Grid>
            )}

            <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
              <Grid item>{customList(`${shareInfo.fromName}'s list`, left)}</Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                    className={classes.button}
                  >
                    &gt;
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                    className={classes.button}
                  >
                    &lt;
                  </Button>
                </Grid>
              </Grid>
              <Grid item>{customList('Add to my list', right)}</Grid>
            </Grid>
          </>
        )}
      </DialogContent>
      
      {!success && (
        <DialogActions>
          <Button onClick={() => {setOpen(false)}} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {addItems()}} color="primary" disabled={!right.length || loading} autoFocus>
            Save Items
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default AddManyItems;