import React from 'react'
import GridTableComponent from '../../../@core/components/grid-table'
import columns from './columns/main'
import {formatRowData, configs} from './configs'
import TaskStatusCellProvider from './provider/TaskStatus'

const MonitoringTaskLogsPage = () => {
  const {entries, settings, urls, keys, fixedColumns} = configs

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
      fixedColumns={fixedColumns}
      providerComponents={[TaskStatusCellProvider]}
    />
  )
}

export default MonitoringTaskLogsPage
