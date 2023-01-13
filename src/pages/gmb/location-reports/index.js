import React from 'react'
import GridTableComponent from '../../../@core/components/grid-table'
import columns from './columns/main'
import {formatRowData, configs} from './configs'
import DownloadCSVCellProvider from './provider/DownloadCSV'

const LocationReportPage = () => {
  const {entries, settings, keys, urls, fixedColumns} = configs
  const QUERY = {
    url: urls.list,
    key: keys.list,
  }

  return (
    <GridTableComponent
      columns={columns}
      query={QUERY}
      formatData={formatRowData}
      entries={entries}
      settings={settings}
      columnExports={columns.filter(c => c.name !== 'download_csv')}
      providerComponents={[DownloadCSVCellProvider]}
      fixedCols={fixedColumns}
    />
  )
}

export default LocationReportPage
