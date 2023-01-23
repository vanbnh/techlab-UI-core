import {endOfMonth, startOfMonth} from 'date-fns'
import moment from 'moment'
import {uid} from 'uid'
import columns from '../columns/main'
export const configs = {
  entries: 'Post Reports',
  settings: [
    'exporting',
    'selecting',
    'reordering',
    'filtering',
    'searching',
    'pagination',
    'summary',
  ],
  keys: {
    list: 'GMB_POST_REPORTS',
    detail: 'GMB_POST_REPORT_DETAIL',
    statistic: 'GMB_POST_REPORT_STATISTIC',
  },
  urls: {
    list: '/post-report/',
    detail: '/post-report/',
    statistic: '/statistic/post/',
  },
  columns,
  path: '/gmb/reports/posts',
  fixedColumns: {
    left: ['actions', 'post_id', 'client_name'],
    right: ['download_csv'],
  },
  statistic: [
    {
      key: 'post_actions_call_to_action',
      name: 'Call To Action',
    },
    {
      key: 'post_views_search',
      name: 'Views Search',
    },
  ],
  filters: [
    {
      id: uid(),
      key: 'report_date',
      condition: 'between',
      conditionName: 'between',
      value: [
        moment(startOfMonth(new Date())).format('YYYY-MM-DD'),
        moment(endOfMonth(new Date())).format('YYYY-MM-DD'),
      ],
      title: 'REPORT DATE',
      type: 'date',
    },
  ],
}
export const formatRowData = data =>
  data.map((d, idx) => ({
    ...d,
    id: `${new Date().getTime()}_${idx}`,
  }))
