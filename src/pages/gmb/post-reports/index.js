import React, {useState} from 'react'
import GridTableComponent from '../../../@core/components/grid-table'
import {useGetClientOptions} from '../location-reports/hook/useGetOptions'
import columns from './columns/main'
import {formatRowData, configs} from './configs'
import ActionsProvider from './provider/Actions'
import DownloadCSVCellProvider from './provider/DownloadCSV'

const PostReportPage = () => {
  const {entries, settings, keys, urls, fixedColumns, filters} = configs
  const [columnState, setColumnState] = useState(columns)
  useGetClientOptions(columnState, setColumnState)
  const QUERY = {
    url: urls.list,
    key: keys.list,
  }

  return (
    <GridTableComponent
      columns={columnState}
      query={QUERY}
      formatData={formatRowData}
      entries={entries}
      settings={settings}
      columnExports={columns.filter(c => !c.isDetailHidden)}
      providerComponents={[ActionsProvider, DownloadCSVCellProvider]}
      fixedCols={fixedColumns}
      initialFilters={filters}
    />
  )
}

export default PostReportPage
