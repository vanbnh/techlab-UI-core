import axios from 'axios'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {useLocation} from 'react-router-dom'
import {Card, Col, Row} from 'reactstrap'
import DatePickerComponent from '../../../@core/components/date-picker'
import {SelectField} from '../../../@core/components/form-field'
import menuConfigs from '../../../configs/menu'
import {searchParamtoObject} from '../../../utility/Utils'
import {BreadcrumbDetail} from '../../common/detail'
import {configs} from './configs'

const calculateChange = (first, last) =>
  Math.round(((last - first) / first) * 100, 2)

const calculateAverage = array =>
  Math.round(array.reduce((acc, cur) => acc + cur, 0) / array.length)

const parentTo = menuConfigs.report.location.path

const LocationReportStatisticPage = () => {
  const {urls, keys, entries, statistic} = configs
  const {search} = useLocation()
  const params = searchParamtoObject(search)
  const locationId = params?.path?.split('/')[3]

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
            location_id: locationId,
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
    if (data?.length > 0) {
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

  return (
    <>
      <div className="mb-1">
        <BreadcrumbDetail
          data={{
            parentName: entries,
            parentTo,
            activeName: locationId,
          }}
        />
      </div>
      <Card>
        <div className="p-1">
          <Row>
            <Col sm="3">
              <DatePickerComponent
                datePicker={datePicker}
                setDatePicker={setDatePicker}
              />
            </Col>
            <Col sm="9">
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
    </>
  )
}

export default LocationReportStatisticPage
