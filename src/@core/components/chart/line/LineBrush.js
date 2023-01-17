import React from 'react'
import Chart from '../core'

const ChartLineBrush = ({data: chartData, dateRange}) => {
  if (!chartData) return null

  const {key, name, data} = chartData

  const series = [
    {
      name,
      data: data.map(d => [d[0], d[1]]),
    },
  ]

  const config = {
    series,
    options: {
      chart: {
        id: key,
        type: 'line',
        height: 300,
        toolbar: {
          autoSelected: 'pan',
          show: false,
        },
      },
      title: {
        text: name,
        style: {
          fontSize: '16px',
        },
      },
      colors: ['#2c652f'],
      stroke: {
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
      },
    },
    seriesLine: series,
    optionsLine: {
      chart: {
        id: `chart_${key}`,
        height: 130,
        type: 'area',
        brush: {
          target: key,
          enabled: true,
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date(dateRange.start_date).getTime(),
            max: new Date(dateRange.end_date).getTime(),
          },
        },
      },
      colors: ['#00cfe8'],
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.91,
          opacityTo: 0.1,
        },
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        tickAmount: 2,
      },

      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
    },
  }
  return (
    <>
      <Chart
        options={config.options}
        series={config.series}
        type="line"
        height={300}
      />
      <Chart
        options={config.optionsLine}
        series={config.seriesLine}
        type="area"
        height={150}
        style={{
          position: 'relative',
          marginTop: -40,
        }}
      />
    </>
  )
}

export default ChartLineBrush
