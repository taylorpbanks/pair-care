import React from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { ThumbUpAltOutlined, ThumbDownAltOutlined, EditOutlined, DeleteOutlineOutlined } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './MyLists.css'
import AddRow from './AddRow';

const ListRow = ({ row, categories, selectedChip, stages, setSelectedRow, index, selectedRow, onDeleteItem, updateItem }) => {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [isViewMode, setIsViewMode] = React.useState(true);
  const maxLinkLength = 40;
  const handleClickOpen = () => {
      setDeleteOpen(true);
  };

  const handleClose = () => {
    setDeleteOpen(false);
  };

  const onCancel = () => {
    setSelectedRow(null);
    setIsViewMode(true);
  };

  const onSave = (item, e) => {
    updateItem(item, e, index);
  };

  const stageId = stages.find(category => category.id === row.stageId);
  const category = categories.find(category => category.id === row.categoryId);
  const linkDisplay = row.link.substring(0, row.link.length >= maxLinkLength ? maxLinkLength : row.link.length);
  let link = row.link;

  if(!link.startsWith('https://') && !link.startsWith('http://')) {
    link = `http://${row.link}`;
  }

  if (selectedChip !== 0 && selectedChip !== row.categoryId) {
    return (<div />);
  }

  return (
    <>
    {(isViewMode || selectedRow !== index) && (
      <div className="view-row">
        <div className="col-2 m-header-display">
          <div className="d-inline-blk">
            <Avatar className="mr-15" style={{backgroundColor: '#8cc5be'}}>{category.icon}</Avatar>
          </div>

          <div className="d-inline-blk">
            <span className="text-small">{stageId.label}</span>
            <br />
            <span>{category.label}</span>
            <div className="tool-bar">
              <Tooltip title="Edit" aria-label="edit">
                <IconButton aria-label="edit" onClick={() => {setSelectedRow(index);setIsViewMode(false);}} size="small">
                  <EditOutlined />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete" aria-label="delete">
                <IconButton aria-label="delete" onClick={() => handleClickOpen(false)} size="small">
                  <DeleteOutlineOutlined />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="row-brand m-text-center">{`${row.type} - ${row.brand}`}</div>
          <div className="row-item m-text-center m-mb-15">{row.item}</div>
          <div>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {`${linkDisplay}...`} <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
        </div>

        <div className="col-3">
          <div>
            {row.age}
            <span className="float-right">{row.isRecommended === 'Y' ?
              <ThumbUpAltOutlined style={{color: '#8cc5be'}} /> :
              <ThumbDownAltOutlined style={{color: '#dc9577'}} />}
            </span>
          </div>
          <hr />
          <div>{row.comments}</div>
        </div>
      </div>
    )}

    {!isViewMode && selectedRow === index && (
      <AddRow
        row={row}
        stages={stages}
        categories={categories}
        setSelectedRow={setSelectedRow}
        selectedStage={row.stageId}
        selectedChip={selectedChip}
        onSave={onSave}
        onCancel={onCancel}
      />
    )}

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

        <Button onClick={(e) => {handleClose(false);onDeleteItem(row.id);}} color="primary">
          Delete Item
        </Button>
      </DialogActions>
    </Dialog>
  </>
  );
}

export default ListRow;
