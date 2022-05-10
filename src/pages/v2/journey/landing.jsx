import React, { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Fab
} from '@material-ui/core';
import {
  faBaby,
  faBed,
  faCouch
} from '@fortawesome/free-solid-svg-icons';
import {
  Add,
  AddCircleOutline,
  ChevronRights
} from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import categories from '../../../constants/categories';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';

// custom components
import PersonHeadline from './person-headline';
import CategoryCard from './category-card';
import Items from './items';
import CribIcon from '@mui/icons-material/Crib'
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly'
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'
import ChairAltIcon from '@mui/icons-material/ChairAlt'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'


import CircularProgress from '@mui/material/CircularProgress';


function Landing({ myList }) {
  const params = useParams();

  useEffect(() => {
    document.title = 'Pair Care | Journey';
    window.scrollTo(0, 0)
  }, []);

  const rawList = categories[2][params.id]
  const category = rawList
  const items = []
  rawList.subCategories.forEach(type => {
    const item = myList[2].find(item => {
      return item.categoryId == category.id && type === item.type
    })
    items.push({
      type: type,
      ...item
    })
  })

  return (
    <div className="journey">
      <PersonHeadline />
      <Link to="/journey">&#8249; Back to Categories</Link>
      <div className="flex journey-main mb-45">
        <CategoryCard
          category={category.label}
          totalItems={category.subCategories.length}
          filledItems={items.filter(item => item.item).length}
        />
        <Items items={items} defaultIcon={category.icon} categoryId={params.id} />
      </div>

      {/*all.map(category => (
        <div className="flex journey-main mb-45">
          <CategoryCard
            category={category.title}
            totalItems={category.items.length}
            filledItems={category.items.filter((item) => item.link).length}
          />

          <Items items={category.items} />
          <hr />
        </div>
      ))*/}
    </div>
  )
}

const mapStateToProps = (state) => ({
  myList: state.myList
});

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
