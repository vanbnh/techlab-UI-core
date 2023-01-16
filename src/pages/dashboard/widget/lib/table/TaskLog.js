import React from 'react'
import {configs, formatRowData} from '../../../../gmb/task-logs/configs'
import TaskStatusCellProvider from '../../../../gmb/task-logs/provider/TaskStatus'
import CommonTableWidgetItem from './common'

const MonitoringTaskLogTable = ({...props}) => {
  return (
    <CommonTableWidgetItem
      configs={configs}
      formatData={formatRowData}
      providerComponents={[TaskStatusCellProvider]}
      {...props}
    />
  )
}

export default MonitoringTaskLogTable
