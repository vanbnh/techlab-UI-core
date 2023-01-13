import React, {useState} from 'react'
import {DataTypeProvider} from '@devexpress/dx-react-grid'
import {Button, Spinner} from 'reactstrap'
import {Download} from 'react-feather'
import {downloadFileFromApi, formatDate} from '../../../../utility/Utils'

export const DownloadCSVComponent = ({row}) => {
  const [loading, setLoading] = useState(false)

  const downloadCSV = data =>
    downloadFileFromApi({
      url: '/location-report/export/',
      params: {
        start_date: data.report_date ? formatDate(data.report_date) : '',
        end_date: formatDate(new Date()),
        id: data?.location_id,
      },
      fileName: `location-report-${data?.location_id}.csv`,
      setLoading: val => setLoading(val),
    })

  return (
    <div className="text-center">
      <Button color="relief-primary" size="sm" onClick={() => downloadCSV(row)}>
        {loading ? (
          <Spinner color="white" size="sm" />
        ) : (
          <>
            <Download size={14} />
            <span className="align-middle ms-25">CSV</span>
          </>
        )}
      </Button>
    </div>
  )
}

const DownloadCSVCellProvider = props => (
  <DataTypeProvider
    for={['download_csv']}
    formatterComponent={DownloadCSVComponent}
    {...props}
  />
)

export default DownloadCSVCellProvider
