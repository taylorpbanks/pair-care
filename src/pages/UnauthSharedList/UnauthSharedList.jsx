import React, { useState, Fragment } from "react";
import {
  Avatar,
  Button,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  LockOutlined,
  ShareOutlined,
  ListAltOutlined,
  PeopleOutline,
  BuildOutlined,
} from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems } from '../../graphql/queries';
import stages from '../../constants/stages';
import categories from '../../constants/categories';
import './UnauthSharedList.css';

const UnauthSharedList = ({ id, name }) => {
  const [list, setList] = useState([]);
  const possessiveName = `${name}${name.charAt(name.length-1) === 's' ? '\'' : '\'s'}`
  const maxLinkLength = 40;

  React.useEffect(() => {
    fetchList(2);
  }, []);

  async function fetchList(stage) {
    const apiData = await API.graphql(graphqlOperation(listItems, {filter: {
      stageId: { eq: stage },
      sub: {eq: id}
    }}));

    const { items } = apiData.data.listItems;
    const firstThree = items ? items.slice(0, 3) : items;
    setList(firstThree);
  };

  const getCategory = (categoryId) => {
    return categories[2].find(category => category.id === categoryId);
  }

  const getStage = (stageId) => {
    return stages.find(category => category.id === stageId);
  }

  const getLinkDisplay = (link) => {
    return link.substring(0, link.length >= maxLinkLength ? maxLinkLength : link.length);
  }

  const getAgeLabel = (age) => {
    switch(age) {
      case '0':
        return 'Newborn';
      case 0:
        return 'Newborn';
      case 12: 
        return '1Y';
      case 24:
        return '2Y';
      case 36:
        return '3Y';
      default: 
        return `${age}M`
    }
  };

  const row = (item) => {
    return (
      <div id={item.id} className="view-row">
        <div className="col-2 m-header-display">
          <div className="d-inline-blk">
            <Avatar className="mr-15" style={{backgroundColor: '#226d77'}}>{
              getCategory(item.categoryId).highlighted ? 
              getCategory(item.categoryId).highlighted :
              getCategory(item.categoryId).icon
            }
            </Avatar>
          </div>

          <div className="d-inline-blk">
            <span className="text-small">{getStage(item.stageId).label}</span>
            <br />
            <span>{getCategory(item.categoryId).label}</span>
          </div>
        </div>

        <div className="col-6">
          <div className="row-brand m-text-center">{`${item.type} - ${item.brand}`}</div>
          <div className="row-item m-text-center m-mb-15">{item.item}</div>
          <div>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {`${getLinkDisplay(item.link)}...`} <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
        </div>

        <div className="col-3">
          <div>
            {item.age || item.age === 0 ? getAgeLabel(item.age) : ''} {item.toAge && item.age !== item.toAge ? `to ${getAgeLabel(item.toAge)}` : ''}
            <span className="float-right">{item.isRecommended === 'Y' ?
              <ThumbUpAltOutlined style={{color: '#8cc5be'}} /> :
              <ThumbDownAltOutlined style={{color: '#dc9577'}} />}
            </span>
          </div>
          <hr />
          <div>{item.comments}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="unauth-list">
      <h1>{name} shared their must have items with you!</h1>
      <div className="locked-content mb-15">
        <LockOutlined fontSize="large" color="primary" />
        <h2>Currently sharing the first 3 items of {possessiveName} list with you.</h2>
        <h3 className="mb-30">Sign up to see the rest of the items and reap the benefits of Pair Care!</h3>

        <div className="standard-flex-box mb-30">
          <div className="col-4 ">
            <ListAltOutlined fontSize="large" color="secondary" className="icons-highlights" />
            <br />
            <div className="icons-text">Create</div>
            <p>Create a list of your own recommended items</p>
          </div>

          <div className="col-4">
            <ShareOutlined fontSize="large" color="secondary" className="icons-highlights" />
            <br />
            <div className="icons-text">Share</div>
            <p>Share your list with other parents</p>
          </div>

          <div className="col-4">
            <BuildOutlined fontSize="large" color="secondary" className="icons-highlights" />
            <br />
            <div className="icons-text">Manage</div>
            <p>Manage your list as you discover new products</p>
          </div>
        </div>
        <Button variant="outlined" color="primary" to="/register" component={RouterLink}>
          Sign Up
        </Button>
        <p>
          Already have an account?
          &nbsp;
          <RouterLink to="/login">
            Sign In
          </RouterLink>
        </p>
      </div>

      {list && list.map(item => (
        <Fragment key={`frag-${item.id}`}>
          {row(item)}
        </Fragment>
      ))}
    </div>
  );
}

export default UnauthSharedList;
