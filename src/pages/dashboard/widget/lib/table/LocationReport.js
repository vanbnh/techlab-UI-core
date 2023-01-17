import React from 'react'
import {configs, formatRowData} from '../../../../gmb/location-reports/configs'
import ActionsProvider from '../../../../gmb/location-reports/provider/Actions'
import DownloadCSVCellProvider from '../../../../gmb/location-reports/provider/DownloadCSV'
import CommonTableWidgetItem from './common'

const LocationReportTable = ({...props}) => {
  return (
    <CommonTableWidgetItem
      configs={configs}
      formatData={formatRowData}
      columnExports={configs.columns.filter(c => c.name !== 'download_csv')}
      providerComponents={[ActionsProvider, DownloadCSVCellProvider]}
      {...props}
    />
  )
}

export default LocationReportTable
