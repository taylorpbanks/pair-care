import React, { useEffect } from "react";
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
  Hidden,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
} from '@material-ui/core';
import {
  ThumbUp,
  ThumbDown,
  Edit,
  Delete,
  AddCircleOutline,
  CheckCircleOutline,
  Timer,
  MoreVert,
  Favorite,
  Share,
  ExpandMore,
} from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './my-lists.css'
import AddRow from './add-row';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { API } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
    maxWidth: 345,
    marginBottom: 15,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {},
}));

const ItemCard = ({
  row,
  categories,
  selectedChip,
  stages,
  setSelectedRow,
  index,
  selectedRow,
  onDeleteItem,
  updateItem,
  sharedList,
  createItem,
}) => {
  const classes = useStyles();
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [isViewMode, setIsViewMode] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const response = API.get(
    'imgapi',
    '/image',
    {
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Content-Type': 'application/json'
      },
      queryStringParameters: { link: 'https://www.target.com/p/mam-glow-in-the-dark-night-pacifier-0-6-months-2ct-green/-/A-75454632' }
      //queryStringParameters: { link: 'https://www.pair-care.com/' }
    }
  );
  response.then((test) => {
    console.log(test)
  })

  useEffect(() => {
    //const previewData = linkPreviewGenerator(row.link).then(response => {
    //  console.log(response)
    //});
    //const linkPreviewGenerator = require("link-preview-generator");

    //const previewData = linkPreviewGenerator("https://www.youtube.com/watch?v=8mqqY2Ji7_g");
    //console.log(previewData)
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const getAgeLabel = (age, stage) => {
    if (stage && stage.id === 0) {
      return '';
    } else if (stage && stage.id === 1) {
      return `${age}W`;
    }

    switch (age) {
      case '0':
        return stage && stage.id === 2 ? 'Newborn' : '0M';
      case 0:
        return stage && stage.id === 2 ? 'Newborn' : '0M';
      case 12:
        return '1Y';
      case 24:
        return '2Y';
      case 36:
        return '3Y';
      case 48:
        return '4Y';
      case 60:
        return '5Y';
      default:
        return `${age}M`
    }
  };

  const stageId = stages.find(category => category.id === row.stageId);
  const category = categories.find(category => category.id === row.categoryId);
  const linkDisplay = row.link.substring(0, row.link.length >= maxLinkLength ? maxLinkLength : row.link.length);
  let link = row.link;

  if (!link.startsWith('https://') && !link.startsWith('http://')) {
    link = `http://${row.link}`;
  }

  if (selectedChip !== 0 && selectedChip !== row.categoryId) {
    return (<div />);
  }

  return (
    <>
      {/*(isViewMode || selectedRow !== index) && (
      <div className="item-card">
        <strong className="primary-color">{row.item}</strong>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img src={require("../../img/no-img-found.jpg")} alt="picture of item" />
        </a>
        <div>
          <div className="d-inline-blk"><Timer className="mr-5" /></div>
          <div className="d-inline-blk" style={{verticalAlign: 'top'}}>
            {row.age || row.age === 0 ? getAgeLabel(row.age, stageId) : ''} {row.toAge && row.age !== row.toAge ? `to ${getAgeLabel(row.toAge, stageId)}` : ''}
          </div>
        </div>
      </div>

      
    )*/}
      {(isViewMode || selectedRow !== index) && (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="item type" style={{ backgroundColor: '#226d77' }}>
                {category.highlighted ? category.highlighted : category.icon}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={row.item}
            subheader={row.type}
          />
          <CardContent>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img
                src={require("../../img/no-img-found.jpg")} alt="picture of item"
                style={{ maxWidth: '275px', width: '100%' }}
              />
            </a>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="edit item">
              <Edit />
            </IconButton>
            <IconButton aria-label="delete item">
              <Delete />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMore />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                <div className="d-inline-blk"><Timer className="mr-5" /></div>
                <div className="d-inline-blk" style={{ verticalAlign: 'top' }}>
                  {row.age || row.age === 0 ? getAgeLabel(row.age, stageId) : ''} {row.toAge && row.age !== row.toAge ? `to ${getAgeLabel(row.toAge, stageId)}` : ''}
                </div>
                <span className="float-right">{row.isRecommended === 'Y' ?
                  <ThumbUp style={{ color: '#8cc5be' }} /> :
                  <ThumbDown style={{ color: '#dc9577' }} />}
                </span>
              </Typography>
              <Typography paragraph>
                {row.comments}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      )}
      {/*(isViewMode || selectedRow !== index) && (
      <div className="view-row">
        <div className="col-2 m-header-display">
          <div className="d-inline-blk">
            <Avatar className="mr-15" style={{backgroundColor: '#226d77'}}>{category.highlighted ? category.highlighted : category.icon}</Avatar>
          </div>

          <div className="d-inline-blk">
            <span className="text-small">{stageId.label}</span>
            <br />
            <span>{category.label}</span>
            {!sharedList && (
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
            )}

            {sharedList && !row.added && (
              <div className="tool-bar">
                <Tooltip title="Add Item" aria-label="Add">
                  <IconButton aria-label="Add Item" onClick={(e) => {createItem(row, e)}} size="small">
                    <AddCircleOutline />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
          
          {sharedList && row.added && (
            <div className="secondary-color mt-15">
              <CheckCircleOutline color="secondary" style={{verticalAlign: 'middle'}} /> Item on your list
            </div>
          )}
        </div>

        <div className="col-6">
          <div className="row-brand m-text-center">{`${row.type} ${row.brand === '' || row.type === '' ? '' : '-'} ${row.brand}`}</div>
          <div className="row-item m-text-center m-mb-15">{row.item}</div>
          <div className="mb-15">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {`${linkDisplay}...`} <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
        </div>

        <div className="col-3">
          <div className="mb-15">
            {row.age || row.age === 0 ? getAgeLabel(row.age, stageId) : ''} {row.toAge && row.age !== row.toAge ? `to ${getAgeLabel(row.toAge, stageId)}` : ''}
            <span className="float-right">{row.isRecommended === 'Y' ?
              <ThumbUpAltOutlined style={{color: '#8cc5be'}} /> :
              <ThumbDownAltOutlined style={{color: '#dc9577'}} />}
            </span>
          </div>
          {stageId && stageId.id !== 0 && <Hidden smDown><hr /></Hidden>}
          <div className="mt-15">{row.comments}</div>
        </div>
      </div>
    )*/}

      {!isViewMode && selectedRow === index && (
        <AddRow
          row={{ ...row, toAge: (row.toAge || row.age) }}
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

          <Button onClick={(e) => { handleClose(false); onDeleteItem(row.id); }} color="primary">
            Delete Item
        </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ItemCard;
