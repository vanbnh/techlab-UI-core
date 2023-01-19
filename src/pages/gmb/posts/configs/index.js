import {formatDate} from '../../../../utility/Utils'
import columns from '../columns/main'

export const configs = {
  entries: 'Posts',
  settings: [
    'exporting',
    'selecting',
    'reordering',
    'filtering',
    'searching',
    'pagination',
  ],
  keys: {
    list: 'GMB_POSTS',
    detail: 'GMB_POST_DETAIL',
    version: 'GMB_POST_VERSION',
  },
  urls: {
    list: '/post/',
    detail: '/post/',
    version: '/version/',
  },
  columns,
  path: '/gmb/accounts',
  fixedColumns: {
    left: ['post_id'],
    right: [],
  },
}
export const formatRowData = data =>
  data.map(d => ({
    ...d,
    summary:
      d.summary && d.summary.length > 50
        ? `${d.summary.slice(0, 50)}...`
        : d.summary,
    start_date: d.start_date && formatDate(d.start_date),
    end_date: d.end_date && formatDate(d.end_date),
    post_create_time: d.post_create_time && formatDate(d.post_create_time),
    post_update_time: d.post_update_time && formatDate(d.post_update_time),
  }))
