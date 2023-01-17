import React from 'react'
import {configs, formatRowData} from '../../../../gmb/post-reports/configs'
import ActionsProvider from '../../../../gmb/post-reports/provider/Actions'
import DownloadCSVCellProvider from '../../../../gmb/post-reports/provider/DownloadCSV'
import CommonTableWidgetItem from './common'

const PostReportTable = ({...props}) => {
  return (
    <CommonTableWidgetItem
      configs={configs}
      formatData={formatRowData}
      columnExports={configs.columns.filter(c => c.name !== 'download_csv')}
      providerComponents={[ActionsProvider, DownloadCSVCellProvider]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default PostReportTable
