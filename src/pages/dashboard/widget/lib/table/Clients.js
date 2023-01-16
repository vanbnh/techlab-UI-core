import React from 'react'
import {configs, formatRowData} from '../../../../gmb/clients/configs'
import CommonTableWidgetItem from './common'

const ClientTable = ({...props}) => {
  return (
    <CommonTableWidgetItem
      configs={configs}
      formatData={formatRowData}
      {...props}
    />
  )
}

export default ClientTable
