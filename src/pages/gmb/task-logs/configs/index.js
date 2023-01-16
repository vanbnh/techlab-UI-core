import columns from '../columns/main'
export const configs = {
  entries: 'Task Logs',
  settings: [
    'export',
    'select',
    'reordering',
    'filter',
    'search',
    'pagination',
  ],
  keys: {
    list: 'GMB_MONITORING_TASK_LOGS',
    detail: 'GMB_MONITORING_TASK_LOG_DETAIL',
  },
  urls: {
    list: '/monitoring-task-log/',
    detail: '/monitoring-task-log/',
  },
  columns,
  path: '/gmb/monitoring/task-logs',
  fixedColumns: {
    left: ['task_name'],
    right: [],
  },
}
export const formatRowData = data =>
  data.map((d, idx) => ({
    ...d,
    id: `${new Date().getTime()}_${idx}`,
    task_celery_id:
      (d.task_celery && d.task_celery.task_id) ||
      (d.task_celery && d.task_celery.id) ||
      '',
  }))
