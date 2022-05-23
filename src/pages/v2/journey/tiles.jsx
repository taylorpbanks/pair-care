import React from 'react';
import categories from '../../../constants/categories';
import { Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart'
import './journey.css'

const tiles = categories[2]

const PieStuff = ({ tile }) => {
  //TODO: remove hardcoded values
  const filledItems = 0;
  const totalItems = tile.subCategories.length;
  const percent = (filledItems/totalItems) * 100

  return (
    <div style={{ width: '75px'}}>
      <PieChart
        data={[{ value: percent, color: '#226d77' }]}
        totalValue={100}
        lineWidth={20}
        label={({ dataEntry}) => `${filledItems}/${totalItems}`}
        labelStyle={{
          fontSize: '15px',
          fill: '#226d77'
        }}
        background="#d2d2d2"
        labelPosition={0}
      />
    </div>
  )
}

const Tiles = () => {
  return (
    <div className="tile-page standard-flex-box">
      {
        tiles.map((tile, index) => (
          <>
            {index !==0 && (
              <Link
                to={`/category/${tile.id}`}
                className={`col-4 tile-container ${index % 2 === 0 ? 'blue-tile' : 'pink-tile'}`}
                key={tile.id || tile.label}
              >
              <div className="tile" style={{ 
                backgroundImage: `url("${tile.img}")`,
                backgroundSize: '100%',
                backgroundPosition: 'bottom'
               }}>
                <h3 className="mt-30" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>{tile.label}</h3>
              </div>
            </Link>
            )}
          </>
        ))
      }
    </div>
  )
}

export default Tiles