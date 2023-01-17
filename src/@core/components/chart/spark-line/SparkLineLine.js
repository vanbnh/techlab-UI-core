import React from 'react'
import Chart from '../core'

const SimpleSparklineLine = ({data: chartData}) => {
  if (!chartData) return null
  const {data, height, change} = chartData
  return (
    <Chart
      series={[
        {
          data: data.length > 0 ? data.map(d => d[1]) : [],
        },
      ]}
      options={{
        chart: {
          type: 'line',
          width: data.length * 6,
          height: 42,
          sparkline: {
            enabled: true,
          },
        },
        stroke: {
          width: 2,
        },
        colors: [change > 0 ? '#46bcaa' : '#f35421'],
        tooltip: {
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          y: {
            title: {
              // eslint-disable-next-line no-unused-vars
              formatter(seriesName) {
                return ''
              },
            },
          },
          marker: {
            show: false,
          },
        },
      }}
      type="line"
      height={height || 42}
      width={data.length * 6}
    />
  )
}

export default SimpleSparklineLine
