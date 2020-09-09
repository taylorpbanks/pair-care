import React from "react";
import {
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from '@material-ui/core';
import { ThumbUp, ThumbDown, ExpandMore, Edit, Delete } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './MyLists.css'
import EditRow from './EditRow';

const ListRow = ({ row, categories, selectedChip, stages, showRecommended, index }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleClickOpen = (isEdit) => {
    if (isEdit) {
      setEditOpen(true);
    } else {
      setDeleteOpen(true);
    }
  };

  const handleClose = (isEdit) => {
    if (isEdit) {
      setEditOpen(false)
    } else {
      setDeleteOpen(false);
    }
  };


  const stageId = stages.find(category => category.id === row.stageId);
  const category = categories.find(category => category.id === row.categoryId);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (selectedChip !== 0 && selectedChip !== row.categoryId) {
    return (<div />);
  }

  if ((showRecommended && row.isRecommended === 'N') || (!showRecommended && row.isRecommended === 'Y')) {
    return (<div />);
  }

  return (
    <>
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Avatar className="mr-15">{category.icon}</Avatar>
        <div className="first-col">
          <span className="text-small">{stageId.label}</span>
          <br />
          {category.label}
        </div>
        <div>
          <span className="row-brand">{`${row.type} - ${row.brand}`}</span>
          <br />
          <span className="row-item">{row.item}</span>
        </div>
      </AccordionSummary>
      <AccordionDetails className="wrap-container">
        <div className="col-4">
          <h5 className="m-0">Recommended Age</h5>
          {row.age}
        </div>

        {row.isRecommended === 'Y' ? (
          <div className="col-4">
            <h5 className="m-0">Recommendation</h5>
            <ThumbUp fontSize="small" /> <span className="recommended-text">Parent Approved!</span>
          </div>
        ) :
        (
          <div className="col-4">
            <ThumbDown fontSize="small" /> <span className="recommended-text">Don't waste your time</span>
          </div>
        )}

        <div className="col-4">
          <h5 className="m-0">Link</h5>
          <a href={row.link} className="website-link" target="_blank" rel="noopener noreferrer">
            Website <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>

        <div className="col-12">
          <h5 className="mb-0">Additional Comments</h5>
          {row.comments}
        </div>

        <div className="col-12 row-footer">
          <IconButton aria-label="edit" onClick={() => handleClickOpen(true)}>
            <Edit />
          </IconButton>

          <IconButton aria-label="delete" onClick={() => handleClickOpen(false)}>
            <Delete />
          </IconButton>
        </div>
      </AccordionDetails>
    </Accordion>

    <Dialog
      open={deleteOpen}
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
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleClose(false)} color="primary" autoFocus>
          Cancel
        </Button>

        <Button onClick={(e) => {handleClose(false);}} color="primary">
          Delete Item
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog open={editOpen} onClose={() => handleClose(true)} maxWidth="lg" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change the information below:
          </DialogContentText>
          <EditRow
            key={`${row.id}-${index}`}
            row={row}
            stages={stages}
            categories={categories}
            index={index}
            handleChange={() => {}}
            inViewMode={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            Update
          </Button>
        </DialogActions>
    </Dialog>
  </>
  );
}

export default ListRow;
