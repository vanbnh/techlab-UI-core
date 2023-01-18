import React, {useEffect, useState} from 'react'
import {Card, CardBody} from 'reactstrap'
import cn from 'classnames'
import Loading from '@src/@core/components/grid-table/components/loading/Loading'
import {useMedia} from 'react-use'
import {useTranslation} from 'react-i18next'

const CardTableDetail = ({
  data,
  dataVersionCurrent,
  dataVersionCompare,
  isLoadingVersion,
}) => {
  // *** STATE ***
  const {t} = useTranslation()
  const [checkDataChange, setCheckDataChange] = useState({})
  const isWide = useMedia('(max-width: 480px)')

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

  const renderCell = value => (isWide ? <small>{value}</small> : value)
  const renderTitleCell = value =>
    isWide ? <small>{t(value)}</small> : t(value)

  const renderBody = () =>
    dataVersionCompare ? (
      <table className="table table-responsive table-bordered table-sm">
        <tbody>
          {Object.keys(dataVersionCurrent).map(key => (
            <tr key={key}>
              <td className="fw-bolder text-nowrap">{renderTitleCell(key)}</td>
              <td
                className={cn('text-nowrap', {
                  'bg-light-danger': checkDataChange[key],
                })}
                style={{maxWidth: '30vw', overflow: 'auto'}}
              >
                {renderCell(dataVersionCurrent[key])}
              </td>
              <td
                className={cn('text-nowrap', {
                  'bg-light-success': checkDataChange[key],
                })}
                style={{maxWidth: '30vw', overflow: 'auto'}}
              >
                {renderCell(dataVersionCompare[key])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <table className="table table-responsive table-modern table-striped">
        <tbody>
          {Object.keys(data).map(key => (
            <tr key={key}>
              <td className="fw-bold text-nowrap">{renderTitleCell(key)}</td>
              <td
                className="text-nowrap"
                style={{maxWidth: '50vw', overflow: 'auto'}}
              >
                {renderCell(data[key])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )

  if (!data) return null

  return (
    <Card>
      <CardBody className="p-0 overflow-auto">{renderBody()}</CardBody>
      {isLoadingVersion && <Loading />}
    </Card>
  )
}

export default CardTableDetail
