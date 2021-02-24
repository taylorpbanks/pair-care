import React from "react";
import {
    faBaby,
    //faCar,
    //faBed,
    faHeartbeat,
    //faUtensils,
    faBath,
    //faBrain,
    faTshirt,
    faHandSparkles,
    faInfinity,
    faHandsHelping,
    faShoppingBag,
    faBook,
    faHeart,
    faChair,
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default {
    0: [
      { id: 0, label: 'All', icon: <FontAwesomeIcon icon={faInfinity} /> },
      {
        id: 1,
        label: 'Guides',
        icon: <FontAwesomeIcon icon={faHandsHelping} />,
        subCategories: [
          'Apps',
          'Books',
          'Classes & Groups',
          'Doula',
          'Social Media',
          'Website',
          'Other'
        ]
      },
      {
        id: 2,
        label: 'Health',
        icon: <FontAwesomeIcon icon={faHeartbeat} />,
        subCategories: ['Vitamins and Supplements', 'Other']
      },
    ],
    1: [
      { id: 0, label: 'All', icon: <FontAwesomeIcon icon={faInfinity} /> },
      {
        id: 1,
        label: 'Health',
        icon: <FontAwesomeIcon icon={faHeartbeat} />,
        subCategories: [
          'Bath and Lotions',
          'Fitness',
          'Makeup and Perfume',
          'Vitamins and Supplements',
          'Other',
        ]
      },
      {
        id: 2,
        label: 'Clothing',
        icon: <FontAwesomeIcon icon={faTshirt} />,
        subCategories: [
          'All Clothing',
          'Belly Bands & Shapewear',
          'Bottoms',
          'Bras & Undergarments',
          'Coats and Jackets',
          'Dresses',
          'Swimwear',
          'Shoes',
          'Tops',
          'Other',
        ]
      },
      {
        id: 3,
        label: 'Guides',
        icon: <FontAwesomeIcon icon={faHandsHelping} />,
        subCategories: [
          'Apps',
          'Books',
          'Classes & Groups',
          'Doula',
          'Social Media',
          'Website',
          'Other'
        ]
      },
      {
        id: 4,
        label: 'Hospital Bag',
        icon: <FontAwesomeIcon icon={faShoppingBag} />,
        subCategories: [
          'Clothes', 
          'Nursing Bra',
          'Socks and Slippers',
          'Toiletries',
          'Other',
        ]
      },
    ],
    2: [
      { id: 0, label: 'All', icon: <FontAwesomeIcon icon={faInfinity} /> },
      {     id: 1,
        label: 'On the Go',
        icon: <img src={require("../img/t-icons/Stroller-d.png")} alt="stroller" width="25px" />,
        highlighted: <img src={require("../img/t-icons/Stroller-h.png")} alt="stroller"  width="25px" />,
        //icon: <FontAwesomeIcon icon={faCar} />,
        subCategories: [
          'Car Accessories',
          'Car Seats',
          'Diaper Bags and Mats',
          'Scooters and Bikes',
          'Stollers & Accessories',
          'Travel Cribs',
          'Wagons',
          'Other',
        ]
      },
      {
        id: 2,
        label: 'Sleeping',
        icon: <img src={require("../img/t-icons/Bassinet-d.png")} alt="bassinet" width="25px" />,
        highlighted: <img src={require("../img/t-icons/Bassinet-h.png")} alt="bassinet" width="25px" />,
        //icon: <FontAwesomeIcon icon={faBed} />,
        subCategories: [
          'Bumpers',
          'Cribs & Mattresses',
          'Crib Sheets & Blankets',
          'Nightlights and Sound Machines',
          'Mobiles',
          'Swaddles',
          'Other',
        ]
      },
      {
        id: 3,
        label: 'Feeding & Nursing',
        icon: <img src={require("../img/t-icons/Bottles-d.png")} alt="bottle" width="25px" />,
        highlighted: <img src={require("../img/t-icons/Bottles-h.png")} alt="bottle"  width="25px" />,
        //icon: <FontAwesomeIcon icon={faUtensils} />,
        subCategories: [
          'Baby Food Processor',
          'Bibs',
          'Bottles & Accessories',
          'Formulas',
          'High Chairs',
          'Nursing Covers',
          'Plates/Cups/Utensils',
          'Pumps & Accessories',
          'Purees and Snacks',
          'Other',
        ]
      },
      {
        id: 4,
        label: 'Bath time',
        icon: <FontAwesomeIcon icon={faBath} />,
        subCategories: [
          'Cleaning Devices',
          'Shampoos and Body Washes',
          'Bath Toys',
          'Tub Accessories',
          'Other',
        ]
      },
      {
        id: 5,
        label: 'Health & Safety',
        icon: <FontAwesomeIcon icon={faHeartbeat} />,
        subCategories: [
          'Baby Proofing',
          'Ear Protection',
          'First Aid',
          'Grooming & Creams',
          'Humidifiers', 
          'Monitors',
          'Pacifiers and Teethers',
          'Other',
        ]
      },
      {
        id: 6,
        label: 'Play & Learn',
        icon: <img src={require("../img/t-icons/Rattle-d.png")} alt="rattle" width="25px" />,
        highlighted: <img src={require("../img/t-icons/Rattle-h.png")} alt="rattle" width="25px" />,
        //icon: <FontAwesomeIcon icon={faBrain} />,
        subCategories: [
          'Activity Centers & Mats',
          'Bouncers & Swings',
          'Playards & Accessories',
          'Rattles',
          'Stuffed Animals',
          'Toys',
          'Walkers',
          'Other',
        ]
      },
      {
        id: 7,
        label: 'Clothing',
        icon: <img src={require("../img/t-icons/onesie-d.png")} alt="onesie" width="25px" />,
        highlighted: <img src={require("../img/t-icons/onesie-h.png")} alt="onesie" width="25px" />,
        subCategories: [
          'Bottoms',
          'Gloves',
          'Gowns',
          'Jackets', 
          'Headwear',
          'Onesie and Footies',
          'Shoes',
          'Socks',
          'Swimwear',
          'Tops and Sweaters',
          'Other',
        ]
      },
      {
        id: 8,
        label: 'Changing Station',
        icon: <FontAwesomeIcon icon={faBaby} />,
        subCategories: [
          'Changing Pad',
          'Changing Pad Covers',
          'Diaper Pail & Liners',
          'Diapers',
          'Wipes',
          'Lotions and Ointments',
          'Potty Training',
          'Other',
        ]
    
      },
      {
        id: 9,
        label: 'Cleaning Supplies',
        icon: <FontAwesomeIcon icon={faHandSparkles} />,
        subCategories: [
          'Brushes and Sponges',
          'Dishwashing Soap',
          'Laundry',
          'Solutions and Spray',
          'Other',
        ]
      },
      {
        id: 10,
        label: 'Guides',
        icon: <FontAwesomeIcon icon={faHandsHelping} />,
        subCategories: [
          'Apps',
          'Books',
          'Classes & Groups',
          'Doula',
          'Social Media',
          'Website',
          'Other'
        ]
      },
      {
        id: 11,
        label: 'Baby Books',
        icon: <FontAwesomeIcon icon={faBook} />,
        subCategories: [
          'Black and White',
          'Board Book',
          'Pop-up',
          'Touch and Feel',
          'Other',
        ]
      },
      {
        id: 12,
        label: 'Memories',
        icon: <FontAwesomeIcon icon={faHeart} />,
        subCategories: [
          'Journals',
          'Keepsake',
          'Letter Board',
          'Milestone Marker',
          'Photos & Accessories',
          'Other',
        ]
      },
      {
        id: 12,
        label: 'Furniture',
        icon: <FontAwesomeIcon icon={faChair} />,
        subCategories: [
          'Bassinet stands',
          'Dressers',
          'Ottomans',
          'Rockers and Gliders',
          'Rugs',
          'Side Tables',
          'Wallpaper and Art',
          'Other',
        ]
      },
    ]
}
