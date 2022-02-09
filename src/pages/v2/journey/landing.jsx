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

const all = [
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
]

function Landing({ }) {
  useEffect(() => {
    document.title = 'Pair Care | Journey';
    window.scrollTo(0, 0)
  }, []);


  return (
    <div className="journey">
      <PersonHeadline />

      {all.map(category => (
        <div className="flex journey-main mb-45">
          <CategoryCard
            category={category.title}
            totalItems={category.items.length}
            filledItems={category.items.filter((item) => item.link).length}
          />

          <Items items={category.items} />
          <hr />
        </div>
      ))}


      {/* <h1>Let's build a nursery</h1>
      <Card style={{ width: '300px', display: 'inline-block', minHeight: '450px' }} className="mr-15 pr-15">
        <CardHeader
          avatar={
            <Avatar aria-label="crib" style={{ backgroundColor: '#226d77' }}>
              <FontAwesomeIcon icon={faBed} />
            </Avatar>
          }
          title="Crib"
          subheader="West Elm - Gemini Crib"
        />
        <CardContent>
          <a href="#">
            <img style={{ width: '100%' }} src={require('../../../img/concept/crib.jpg')} />
          </a>
          <p className="text-right">
            <a href="#">See more suggestions ›</a>
          </p>
        </CardContent>
      </Card>

      <Card style={{ width: '300px', display: 'inline-block', minHeight: '450px' }} className="ml-15 pl-15">
        <CardHeader
          avatar={
            <Avatar aria-label="crib" style={{ backgroundColor: '#226d77' }}>
              <FontAwesomeIcon icon={faBaby} />
            </Avatar>
          }
          title="Changing Table"
          subheader="Make your pick!"
        />
        <CardContent>
          <div style={{ width: '268px', height: '268px' }}>
            <Fab color="primary" aria-label="add" style={{ position: 'relative', left: '40%' }}>
              <Add />
            </Fab>
            <h4 className="mt-30">Suggestions</h4>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '130px', display: 'inline-block', textAlign: 'center' }}>
                <a href="https://www.westelm.com/products/hudson-3-drawer-changing-table-h9028/?pkey=cchanging-tables">
                  <img style={{ width: '100%' }} src={require('../../../img/concept/changing-table-1.jpg')} />
                  <br />
                  West Elm - Babyletto Hudson
                </a>
                <br />
                <AddCircleOutline color="secondary" style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ width: '130px', display: 'inline-block', textAlign: 'center', paddingLeft: '5px' }}>
                <a href="https://www.wayfair.com/Little-Seeds--Monarch-Hill-Hawken-Changing-Table-Dresser-5715407COM-L218-K~W002967088.html?refid=GX528880927665-W002967088&device=c&ptid=893049660391&network=g&targetid=pla-893049660391&channel=GooglePLA&ireid=51633606&fdid=1817&gclid=Cj0KCQiA_JWOBhDRARIsANymNOY0ans9q3LxR-ZPMVH0nsFaU2Q34jrnd4AY7rRpjKhVnlFvhrl07NUaAsX3EALw_wcB">
                  <img style={{ width: '100%' }} src={require('../../../img/concept/changing-table-2.jpg')} />
                  <br />
                  Wayfair - Monarch Hill Hawken
                </a>
                <br />
                <AddCircleOutline color="secondary" style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card style={{ width: '300px', display: 'inline-block', minHeight: '450px' }} className="ml-15 pl-15">
        <CardHeader
          avatar={
            <Avatar aria-label="crib" style={{ backgroundColor: '#226d77' }}>
              <FontAwesomeIcon icon={faCouch} />
            </Avatar>
          }
          title="Nursery Seating"
          subheader="Make your pick!"
        />
        <CardContent>
          <div style={{ width: '268px', height: '268px' }}>
            <Fab color="primary" aria-label="add" style={{ position: 'relative', left: '40%' }}>
              <Add />
            </Fab>
            <h4 className="mt-30">Suggestions</h4>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '130px', display: 'inline-block', textAlign: 'center' }}>
                <a href="https://www.crateandbarrel.com/snoozer-cream-nursery-glider-chair-by-leanne-ford/s630623?localedetail=US&a=1552&campaignid=12237167257&adgroupid=119984803169&targetid=pla-557249027004&pla_sku=630623&pcat=HSW&ag=baby&scid=scplp630623&sc_intid=630623&gclid=Cj0KCQiA_JWOBhDRARIsANymNOYhb52Pa2zQsKwAHzpkuY_kNGI0_5sNx9nVcnvhd5cxGE6xqrwttZ0aArksEALw_wcB">
                  <img style={{ width: '100%' }} src={require('../../../img/concept/seating-1.jpg')} />
                  <br />
                  Crate & Barrel - Snoozer Glider
                </a>
                <br />
                <AddCircleOutline color="secondary" style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ width: '130px', display: 'inline-block', textAlign: 'center', paddingLeft: '5px' }}>
                <a href="https://www.wayfair.com/baby-kids/pdp/harriet-bee-cookson-reclining-rocking-chair-w001845481.html">
                  <img style={{ width: '100%' }} src={require('../../../img/concept/seating-2.jpg')} />
                  <br />
                  Wayfair - Cookson Reclining Rocking
                </a>
                <br />
                <AddCircleOutline color="secondary" style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>
        </CardContent>
        </Card> */}
    </div>
  )
}

export default Landing