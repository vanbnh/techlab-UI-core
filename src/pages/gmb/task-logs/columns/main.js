import {Badge} from 'reactstrap'
import menuConfigs from '../../../../configs/menu'
import {formatDate} from '../../../../utility/Utils'

const COLUMN_MAIN = [
  {
    title: 'ID',
    name: 'task_id',
    isLink: true,
    validLink: row => {
      let valid = false
      if (
        Object.keys(row.task_input).length > 0 ||
        Object.keys(row.task_result).length > 0 ||
        row.task_errors.length > 0
      ) {
        valid = true
      }
      return valid
    },
    to: row => `${menuConfigs.monitoring.task_log.path}/${row.task_id}`,
    width: 100,
  },
  {
    title: 'TASK NAME',
    name: 'task_name',
    width: 200,
  },
  {
    title: 'STATUS',
    name: 'task_status',
    cell: row => (
      <Badge
        color={
          row.task_status === 'light-success' ? 'light-success' : 'light-danger'
        }
      >
        {row.task_status}
      </Badge>
    ),
  },
  {
    title: 'TASK USER',
    name: 'task_user',
    width: 100,
  },
  {
    title: 'TASK CLIENT',
    name: 'task_client',
    width: 120,
  },
  {
    title: 'TASK ACCOUNT',
    name: 'task_account',
  },
  {
    title: 'CELERY ID',
    name: 'task_celery_id',
    width: 100,
  },
  {
    title: 'UPDATED DATE',
    name: 'updated_at',
    isDate: true,
    cell: row => formatDate(row.updated_at),
  },
  {
    title: 'CREATED DATE',
    name: 'created_at',
    isDate: true,
    cell: row => formatDate(row.created_at),
  },
]
export default COLUMN_MAIN
