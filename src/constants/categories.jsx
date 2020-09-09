import React from "react";
import {
    faBaby,
    faCar,
    faBed,
    faHeartbeat,
    faUtensils,
    faBath,
    faBrain,
    faTshirt,
    faHandSparkles,
    faMale,
    faInfinity,
    faPills,
    faEgg,
    faVial,
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default {
    0: [
      { id: 0, label: 'All', icon: <FontAwesomeIcon icon={faInfinity} /> },
      {
        id: 1,
        label: 'Ovulation',
        icon: <FontAwesomeIcon icon={faEgg} />,
        subCategories: ['Kit', 'Test']
      },
      {
        id: 2,
        label: 'Pregnancy Tests',
        icon: <FontAwesomeIcon icon={faVial} />,
        subCategories: ['Early Detection']
      },
    ],
    1: [
      { id: 0, label: 'All', icon: <FontAwesomeIcon icon={faInfinity} /> },
      {
        id: 1,
        label: 'Vitamins',
        icon: <FontAwesomeIcon icon={faPills} />,
        subCategories: ['Capsules', 'Gummies']
      },
      {
        id: 2,
        label: 'Maternity Clothes',
        icon: <FontAwesomeIcon icon={faTshirt} />,
        subCategories: ['Dress', 'Shirt', 'Pants', 'Shoes']
      },
    ],
    2: [
      { id: 0, label: 'All', icon: <FontAwesomeIcon icon={faInfinity} /> },
      {     id: 1,
        label: 'On the Go',
        icon: <FontAwesomeIcon icon={faCar} />,
        subCategories: ['Car Seat', 'Car Shade', 'Stroller']
      },
      {
        id: 2,
        label: 'Sleeping',
        icon: <FontAwesomeIcon icon={faBed} />,
        subCategories: ['Crib', 'Pillows', 'Sheets', 'Swaddle']
      },
      {
        id: 3,
        label: 'Feeding & Nursing',
        icon: <FontAwesomeIcon icon={faUtensils} />,
        subCategories: ['Bib', 'Bottle', 'Utensils']
      },
      {
        id: 4,
        label: 'Bath time',
        icon: <FontAwesomeIcon icon={faBath} />,
        subCategories: ['Bath', 'Shampoo', 'Towels']
      },
      {
        id: 5,
        label: 'Health & Safety',
        icon: <FontAwesomeIcon icon={faHeartbeat} />,
        subCategories: ['First Aid Kit', 'Medicine', 'Thermometer']
      },
      {
        id: 6,
        label: 'Play & Learn',
        icon: <FontAwesomeIcon icon={faBrain} />,
        subCategories: ['DVD', 'Toy']
      },
      {
        id: 7,
        label: 'Clothing',
        icon: <FontAwesomeIcon icon={faTshirt} />,
        subCategories: ['Dress', 'Onesie', 'Pants', 'Shirt', 'Shoes']
      },
      {
        id: 8,
        label: 'Changing Station',
        icon: <FontAwesomeIcon icon={faBaby} />,
        subCategories: ['Changing Station', 'Diapers', 'Wipes']
    
      },
      {
        id: 9,
        label: 'Cleaning Supplies',
        icon: <FontAwesomeIcon icon={faHandSparkles} />,
        subCategories: ['Laundry Detergent', 'Multi-Surface Cleaner']
      },
      {
        id: 10,
        label: 'For the Parent',
        icon: <FontAwesomeIcon icon={faMale} />,
        subCategories: ['Book', 'Blog']
      },
    ]
}
