import React from 'react'
import GridTableComponent from '../../../@core/components/grid-table'
import columns from './columns/main'
import {formatAccountData, configs} from './configs'

const QUERY = {
  url: '/gmb-account/',
  key: 'GMB_ACCOUNTS',
}

const AccountPage = () => {
  const {entries, settings} = configs

  return (
    <GridTableComponent
      columns={columns}
      query={QUERY}
      formatData={formatAccountData}
      entries={entries}
      settings={settings}
    />
  )
}

export default AccountPage
