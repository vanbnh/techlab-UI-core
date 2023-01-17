import moment from 'moment'
import React from 'react'
import Chart from '../core'

const SimpleSparklineBar = ({data: chartData}) => {
  if (!chartData) return null
  const {data, height} = chartData
  return (
    <Chart
      series={[
        {
          data: data.length > 0 ? data.map(d => d[1]) : [],
        },
      ]}
      options={{
        chart: {
          type: 'bar',
          width: data.length * 6,
          height: 35,
          sparkline: {
            enabled: true,
          },
        },

        plotOptions: {
          bar: {
            columnWidth: '80%',
          },
        },
        labels: data.map(d => ({
          x: moment(d[0]).format('L'),
          y: d[1],
        })),
        xaxis: {
          crosshairs: {
            width: 1,
          },
        },
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
      type="bar"
      height={height || 35}
      width={data.length * 6}
    />
  )
}

export default SimpleSparklineBar
