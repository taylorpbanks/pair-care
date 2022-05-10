import React from 'react';
import { PieChart } from 'react-minimal-pie-chart'

function CategoryCard({ category='On the go', totalItems=4, filledItems=3 }) {
  const percent = (filledItems/totalItems) * 100

  return (
    <div className="col-2 card-header">
      <h2 className="text-center mt-60" style={{ fontWeight: 300 }}>
        {category}
      </h2>
      <div className="pie-chart">
        <PieChart
          data={[{ value: percent, color: '#226d77' }]}
          totalValue={100}
          lineWidth={20}
          label={({ dataEntry}) => `${filledItems}/${totalItems}`}
          labelStyle={{
            fontSize: '25px',
            fill: '#226d77'
          }}
          background="#d2d2d2"
          labelPosition={0}
        />
      </div>
    </div>
  )
}

export default CategoryCard