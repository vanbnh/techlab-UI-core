import React, {useEffect, useState} from 'react'
import {Card, CardBody} from 'reactstrap'
import cn from 'classnames'
import Loading from '@src/@core/components/grid-table/components/loading/Loading'

const CardTableDetail = ({
  data,
  dataVersionCurrent,
  dataVersionCompare,
  isLoadingVersion,
}) => {
  // *** STATE ***
  const [checkDataChange, setCheckDataChange] = useState({})

  useEffect(() => {
    if (dataVersionCompare) {
      const checkData = {}
      Object.keys(dataVersionCompare).forEach(key => {
        if (dataVersionCompare[key] !== dataVersionCurrent[key]) {
          checkData[key] = true
        }
      })
      setCheckDataChange(checkData)
    }
  }, [dataVersionCurrent, dataVersionCompare])

  const renderBody = () =>
    dataVersionCompare ? (
      <table className="table table-bordered table-sm">
        <tbody>
          {Object.keys(dataVersionCurrent).map(key => (
            <tr key={key}>
              <td className="fw-bolder text-nowrap">
                {key && key.toUpperCase()}
              </td>
              <td
                className={cn('text-nowrap', {
                  'bg-light-danger': checkDataChange[key],
                })}
                style={{maxWidth: '30vw', overflow: 'auto'}}
              >
                {dataVersionCurrent[key]}
              </td>
              <td
                className={cn('text-nowrap', {
                  'bg-light-success': checkDataChange[key],
                })}
                style={{maxWidth: '30vw', overflow: 'auto'}}
              >
                {dataVersionCompare[key]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <table className="table table-modern table-striped">
        <tbody>
          {Object.keys(data).map(key => (
            <tr key={key}>
              <td className="fw-bold text-nowrap">
                {key && key.toUpperCase()}
              </td>
              <td
                className="text-nowrap"
                style={{maxWidth: '50vw', overflow: 'auto'}}
              >
                {data[key]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )

  if (!data) return null

  return (
    <Card>
      <CardBody className="p-0">{renderBody()}</CardBody>
      {isLoadingVersion && <Loading />}
    </Card>
  )
}

export default CardTableDetail
