import React from 'react'
import {DataTypeProvider} from '@devexpress/dx-react-grid'
import {Badge} from 'reactstrap'

const STATUS = {
  success: 'success',
  error: 'danger',
  failed: 'secondary',
  done: 'info',
}

const TaskStatusComponent = ({row}) => {
  return (
    <Badge color={`light-${STATUS[row.task_status]}`}>{row.task_status}</Badge>
  )
}

const TaskStatusCellProvider = props => (
  <DataTypeProvider
    for={['task_status']}
    formatterComponent={TaskStatusComponent}
    {...props}
  />
)

export default TaskStatusCellProvider
