import React from 'react'
import GridTableComponent from '../../../@core/components/grid-table'
import columns from './columns/main'
import {formatRowData, configs} from './configs'
import ActionsProvider from './provider/Actions'
import DownloadCSVCellProvider from './provider/DownloadCSV'

const PostReportPage = () => {
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
      columnExports={columns.filter(c => !c.isDetailHidden)}
      providerComponents={[ActionsProvider, DownloadCSVCellProvider]}
      fixedCols={fixedColumns}
    />
  )
}

export default PostReportPage
