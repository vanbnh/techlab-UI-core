import React from 'react'
import {configs, formatRowData} from '../../../../gmb/accounts/configs'
import CommonTableWidgetItem from './common'

const AccountTable = ({...props}) => {
  return (
    <CommonTableWidgetItem
      configs={configs}
      formatData={formatRowData}
      {...props}
    />
  )
}

export default AccountTable
