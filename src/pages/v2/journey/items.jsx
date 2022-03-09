import React from 'react';
import { PieChart } from 'react-minimal-pie-chart'
import Carousel from 'react-elastic-carousel'
import {
  faBaby,
  faBed,
  faCouch
} from '@fortawesome/free-solid-svg-icons';
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Fab
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CribIcon from '@mui/icons-material/Crib'
import {
  Add,
  AddCircleOutline,
  ChevronRights
} from '@material-ui/icons';
import AddItemForm from './add-item-form';
import './journey.css'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 2 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 2 },
]

const PopulatedItem = ({ item, defaultIcon }) => {
  const Icon = item.icon

  return (
    <Card style={{ width: '300px', display: 'inline-block', minHeight: '450px', margin: '15px' }} className="mr-15 pr-15">
      <CardHeader
        avatar={
          <Avatar aria-label="crib" style={{ backgroundColor: '#226d77' }}>
            {item.icon || defaultIcon}
          </Avatar>
        }
        title={item.title || item}
        subheader={item.subheader}
      />
      <CardContent>
        <a href={item.link}>
          <img style={{ width: '100%' }} src={require('../../../img/concept/crib.jpg')} />
        </a>
        <p className="text-right">
          <a href="#">See more suggestions ›</a>
        </p>
      </CardContent>
    </Card>
  )
}

const UnpopulatedItem = ({ item, setSelected, defaultIcon }) => {
  const Icon = item.icon

  return (
    <Card style={{ width: '300px', display: 'inline-block', minHeight: '450px', margin: '15px' }} className="mr-15 pr-15">
      <CardHeader
        avatar={
          <Avatar aria-label="crib" style={{ backgroundColor: '#226d77' }}>
            {item.icon || defaultIcon}
          </Avatar>
        }
        title={item.title || item}
        subheader="Pick your item!"
      />
        <CardContent>
          <div style={{ width: '268px', height: '268px' }}>
            <Fab color="primary" aria-label="add" style={{ position: 'relative', left: '40%', top: '40%' }} onClick={() => setSelected(item)}>
              <Add />
            </Fab>
          </div>
          <p className="text-right">
            <a href="#">See suggestions ›</a>
          </p>
        </CardContent>
    </Card>
  )
}

function Items({ items, defaultIcon }) {
  const [selected, setSelected] = React.useState(undefined);

  return (
    <div className="col-10 carousel">
      <Carousel breakPoints={breakPoints}>
        {items.map(item => (
          <>
            {/*item.link ? <PopulatedItem item={item} /> : <UnpopulatedItem item={item} setSelected={setSelected} defaultIcon={defaultIcon} />}*/}
            <UnpopulatedItem item={item} setSelected={setSelected} defaultIcon={defaultIcon} />
          </>
        ))}
      </Carousel>
      <AddItemForm item={selected} isOpen={selected} onClose={() => setSelected(undefined)} defaultIcon={defaultIcon} />
    </div>
  )
}

export default Items