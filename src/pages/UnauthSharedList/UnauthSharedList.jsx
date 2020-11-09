import React, { useState } from "react";
import {
  Avatar,
  Button,
  Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  LockOutlined,
  ShareOutlined,
  ListAltOutlined,
  PeopleOutline,
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
    console.log(list);
  };

  const getCategory = (categoryId) => {
    console.log(categories);
    console.log(categoryId);
    console.log(categories[2].find(category => category.id === categoryId));
    return categories[2].find(category => category.id === categoryId);
  }

  const getStage = (stageId) => {
    console.log(stages.find(category => category.id === stageId))
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
          {getCategory(item.categoryId).highlighted ?
            <div className="img-icon-avatar">{getCategory(item.categoryId).highlighted}</div> :
            <Avatar className="mr-15" style={{backgroundColor: '#226d77'}}>{getCategory(item.categoryId).icon}</Avatar>
          }
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

console.log(list);
  return (
    <div>
      <h1>{name} shared their must have items with you!</h1>
      {list && list.map(item => (
        row(item)
      ))}

      <div className="locked-content">
        <LockOutlined fontSize="large" color="primary" />
        <h2>Currently sharing the first 3 items of {name}{name.charAt(name.length-1) === 's' ? '\'' : '\'s'} list with you.</h2>
        <h3 className="mb-30">Sign up to make reap the benefits of Pair Care!</h3>

        <div className="standard-flex-box mb-30">
          <div className="col-4">
            <ListAltOutlined fontSize="large" color="secondary" />
            <br />
            Create a list of your must-have baby items
          </div>

          <div className="col-4">
            <ShareOutlined fontSize="large" color="secondary" />
            <br />
            Share your list with friends
          </div>

          <div className="col-4">
            <PeopleOutline fontSize="large" color="secondary" />
            <br />
            View other people's list to get ideas for your own
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
    </div>
  );
}

export default UnauthSharedList;
