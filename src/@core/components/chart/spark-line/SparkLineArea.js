import moment from 'moment'
import React from 'react'
import Chart from '../core'

const SimpleSparklineArea = ({data: chartData}) => {
  if (!chartData) return null
  const {name, data, last, color, height} = chartData
  return (
    <Chart
      series={[
        {
          name,
          data:
            data.length > 0
              ? data.map(d => ({
                  x: moment(d[0]).format('L'),
                  y: d[1],
                }))
              : [],
        },
      ]}
      options={{
        chart: {
          type: 'area',
          height: 240,
          sparkline: {
            enabled: true,
          },
        },
        stroke: {
          curve: 'straight',
          width: 3,
        },
        fill: {
          opacity: 0.3,
        },

        xaxis: {
          crosshairs: {
            width: 1,
          },
        },
        colors: [color || '#DCE6EC'],
        title: {
          text: last,
          offsetX: 15,
          offsetY: 20,
          style: {
            fontSize: '24px',
          },
        },

        subtitle: {
          text: name,
          offsetX: 15,
          offsetY: 50,
          style: {
            fontSize: '14px',
          },
        },
      }}
      type="area"
      height={height || 260}
    />
  )
}

export default SimpleSparklineArea
