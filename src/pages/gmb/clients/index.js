import React from 'react'
import GridTableComponent from '../../../@core/components/grid-table'
import columns from './columns/main'
import {formatRowData, configs} from './configs'

const ClientPage = ({...rest}) => {
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
      fixedCols={fixedColumns}
      {...rest}
    />
  )
}

export default ClientPage
