import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  DialogContent,
} from '@material-ui/core';
import './share-my-list.css';

function NoItemsModal({
  isOpen,
  handleClose,
}) {
  const [redirect, setRedirect] = useState(undefined);

  if (redirect) {
    return <Redirect to={{
      pathname: redirect,
      state: { seePairCareList: true }
    }} />;
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Looks like you don't have any items to share in your list"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Start your own list from scratch or add from our recommended items.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            //onClick={handleClose}
            onClick={() => setRedirect('/my-list')}
            color="secondary"
            variant="outlined"
          >
            Add myself
          </Button>
          <Button
            //onClick={handleClose}
            onClick={() => setRedirect('/shared-lists')}
            color="primary"
            autoFocus
            variant="outlined"
          >
            Add from Pair Care
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    myList: state.myList,
    sharedLists: state.share.withMe,
    seePairCareList: ownProps.seePairCareList,
  }
};

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoItemsModal);
