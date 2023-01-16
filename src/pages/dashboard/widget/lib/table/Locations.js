import React from 'react'
import {configs, formatRowData} from '../../../../gmb/locations/configs'
import CommonTableWidgetItem from './common'

const LocationTable = ({...props}) => {
  return (
    <CommonTableWidgetItem
      configs={configs}
      formatData={formatRowData}
      {...props}
    />
  )
}

export default LocationTable
