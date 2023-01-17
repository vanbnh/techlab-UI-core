import ReactApexChart from 'react-apexcharts'
import cn from 'classnames'
import '@styles/react/libs/charts/apex-charts.scss'
const ApexChart = ({
  series,
  options,
  type,
  width,
  height,
  className,
  ...props
}) => {
  return (
    <div className={cn('apex-chart', className)} {...props}>
      <ReactApexChart
        options={{
          colors: [
            '#2c652f',
            '#82868b',
            '#28c76f',
            '#00cfe8',
            '#ff9f43',
            '#ea5455',
          ],
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#28c76f',
                downward: '#ea5455',
              },
            },
            boxPlot: {
              colors: {
                upper: '#28c76f',
                lower: '#ea5455',
              },
            },
          },
          ...options,
        }}
        series={series}
        type={type}
        width={width}
        height={height}
      />
    </div>
  )
}

export default ApexChart
