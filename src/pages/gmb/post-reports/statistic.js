import axios from 'axios'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {useLocation} from 'react-router-dom'
import {Card, CardBody, Col, Row} from 'reactstrap'
import cn from 'classnames'
import DatePickerComponent from '../../../@core/components/date-picker'
import {SelectField} from '../../../@core/components/form-field'
import menuConfigs from '../../../configs/menu'
import {searchParamtoObject} from '../../../utility/Utils'
import {BreadcrumbDetail} from '../../common/detail'
import {configs} from './configs'
import SimpleSparklineArea from '../../../@core/components/chart/spark-line/SparkLineArea'
import Spinner from '@src/@core/components/spinner/Fallback-spinner'
import SimpleSparklineLine from '../../../@core/components/chart/spark-line/SparkLineLine'
import SimpleSparklineBar from '../../../@core/components/chart/spark-line/SparkLineBar'
import ChartLineBrush from '../../../@core/components/chart/line/LineBrush'

const calculateChange = (first, last) => {
  if (!first) return 0
  return Math.round(((last - first) / first) * 100, 2)
}

const calculateAverage = array =>
  Math.round(array.reduce((acc, cur) => acc + cur, 0) / array.length)

const parentTo = menuConfigs.report.post.path

const PostReportStatisticPage = () => {
  const {urls, keys, entries, statistic} = configs
  const {search} = useLocation()
  const params = searchParamtoObject(search)
  const postId = params?.path?.split('/')[5]

  // *** REACT QUERY ***
  const [datePicker, setDatePicker] = useState({
    start_date: moment().startOf('week').add('-8', 'week').format('YYYY-MM-DD'),
    end_date: moment().endOf('week').format('YYYY-MM-DD'),
  })
  const {data, isLoading} = useQuery(
    [keys.statistic, params, datePicker],
    async () =>
      await axios
        .get(urls.statistic, {
          params: {
            post_id: postId,
            start_date: datePicker.start_date,
            end_date: datePicker.end_date,
          },
        })
        .then(r => r.data),
  )
  const chartOptions = statistic.map(chart => ({
    ...chart,
    value: chart.key,
    label: chart.name,
  }))

  const [selectCharts, setSelectCharts] = useState(chartOptions)
  const [chartData, setChartData] = useState({})
  useEffect(() => {
    let chartObj = {}
    if (data && data.length > 0) {
      chartObj = selectCharts.reduce((acc, cur) => {
        acc[cur.key] = {
          ...cur,
          data: data.map(item => [
            new Date(item.report_date).getTime(),
            item[cur.key],
          ]),
          last: data[data.length - 1][cur.key],
          change: calculateChange(
            data[0][cur.key],
            data[data.length - 1][cur.key],
          ),
          average: calculateAverage(data.map(d => d[cur.key])),
        }
        return acc
      }, {})
    }
    setChartData(chartObj)
  }, [data, selectCharts])

  // console.log(chartData)

  if (isLoading) return <Spinner />

  return (
    <>
      <div className="mb-1">
        <BreadcrumbDetail
          data={{
            parentName: entries,
            parentTo,
            activeName: postId,
          }}
        />
      </div>
      <Card>
        <div className="p-1">
          <Row>
            <Col sm="4">
              <DatePickerComponent
                datePicker={datePicker}
                setDatePicker={setDatePicker}
              />
            </Col>
            <Col sm="8">
              <div className="w-100">
                <SelectField
                  name="location_report_chart"
                  isMulti
                  value={selectCharts}
                  isClearable
                  closeMenuOnSelect={false}
                  onChange={options => setSelectCharts(options)}
                  options={chartOptions}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Card>
      <Row>
        {Object.keys(chartData).map(key => (
          <Col key={key} md="4">
            <Card>
              <CardBody className="p-0">
                <SimpleSparklineArea data={chartData[key]} />
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Card className="mt-2 table-responsive">
        <table className=" table table-modern table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last</th>
              <th>Average</th>
              <th>Percentage</th>
              <th>
                {moment(datePicker.start_date).format('DD/MM/YYYY')} -{' '}
                {moment(datePicker.end_date).format('DD/MM/YYYY')}
              </th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(chartData).map(key => (
              <tr key={key}>
                <td>{chartData[key]?.name}</td>
                <td>{chartData[key]?.last}</td>
                <td>{chartData[key]?.average}</td>
                <td
                  className={cn({
                    'text-success': chartData[key]?.change > 0,
                    'text-danger': chartData[key]?.change < 0,
                  })}
                >
                  {chartData[key]?.change}%
                </td>
                <td>
                  <SimpleSparklineLine data={chartData[key]} />
                </td>
                <td>
                  <SimpleSparklineBar data={chartData[key]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Row>
        {Object.keys(chartData).map(key => (
          <Col lg="6" key={key}>
            <ChartLineBrush data={chartData[key]} dateRange={datePicker} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default PostReportStatisticPage
