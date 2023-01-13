import React from 'react'
import GridTableComponent from '../../../@core/components/grid-table'
import columns from './columns/main'
import {formatRowData, configs} from './configs'

const AccountPage = () => {
  const {entries, settings, urls, keys} = configs

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
    />
  )
}

export default AccountPage
