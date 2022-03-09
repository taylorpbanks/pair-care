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

/* const all = [
  {
    title: 'Essentials',
    items: [
      {
        title: 'Crib',
        icon: <CribIcon />,
        img: '../../../img/concept/crib.jpg',
        link: 'https://www.westelm.com/products/gemini-crib-white-h7670/',
        brand: 'West Elm',
        subheader: 'Gemini Crib'
      },
      {
        title: 'Changing Table',
        icon: <BabyChangingStationIcon />,
        suggestions: [
          {
            brand: 'West Elm',
            name: 'Babyletto Hudson',
            link: 'https://www.westelm.com/products/hudson-3-drawer-changing-table-h9028/?pkey=cchanging-tables',
            img: '../../../img/concept/changing-table-1.jpg'
          },
          {
            brand: 'Wayfair',
            name: 'Monarch Hill', 
            link: '"https://www.wayfair.com/Little-Seeds--Monarch-Hill-Hawken-Changing-Table-Dresser-5715407COM-L218-K~W002967088.html?refid=GX528880927665-W002967088&device=c&ptid=893049660391&network=g&targetid=pla-893049660391&channel=GooglePLA&ireid=51633606&fdid=1817&gclid=Cj0KCQiA_JWOBhDRARIsANymNOY0ans9q3LxR-ZPMVH0nsFaU2Q34jrnd4AY7rRpjKhVnlFvhrl07NUaAsX3EALw_wcB',
            img: '../../../img/concept/changing-table-2.jpg'
          }
        ]
      },
      {
        title: 'Stroller',
        icon: <ChildFriendlyIcon />
        // https://www.target.com/p/graco-pace-2-0-stroller-perkins/-/A-80179076
      },
      {
        title: 'High Chair',
        icon: <ChairAltIcon />
      },
      {
        title: 'Car Seat',
        icon: <DirectionsCarIcon />
      },
    ]
  },
  {
    title: 'Sleeping',
    items: [
      {
        title: 'Mattresses',
        icon: <CribIcon />
      },
      {
        title: 'Crib Sheets & Blankets',
        icon: <CribIcon />
      },
      {
        title: 'Mobiles',
        icon: <CribIcon />
      },
      {
        title: 'Swaddles',
        icon: <CribIcon />
      }
    ]
  }
] */

function Landing({}) {
  const params = useParams();

  useEffect(() => {
    document.title = 'Pair Care | Journey';
    window.scrollTo(0, 0)
  }, []);

  const category = categories[2][params.id]

  return (
    <div className="journey">
      <PersonHeadline />
      <Link to="/journey">&#8249; Back to Categories</Link>
      <div className="flex journey-main mb-45">
        <CategoryCard
          category={category.label}
          totalItems={category.subCategories.length}
          // filledItems={category.subCategories.filter((item) => item.link).length}
          filledItems={0}
        />
        <Items items={category.subCategories} defaultIcon={category.icon} />
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

export default Landing