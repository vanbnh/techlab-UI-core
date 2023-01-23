import {endOfMonth, startOfMonth} from 'date-fns'
import moment from 'moment'
import {uid} from 'uid'
import columns from '../columns/main'
export const configs = {
  entries: 'Location Reports',
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
    list: 'GMB_LOCATION_REPORTS',
    detail: 'GMB_LOCATION_REPORT_DETAIL',
    statistic: 'GMB_LOCATION_REPORT_STATISTIC',
  },
  urls: {
    list: '/location-report/',
    detail: '/location-report/',
    statistic: '/statistic/location/',
  },
  columns,
  path: '/gmb/reports/locations',
  fixedColumns: {
    left: ['actions', 'location_name', 'client_name'],
    right: ['download_csv'],
  },
  statistic: [
    {
      key: 'actions_driving_directions',
      name: 'Actions driving directions',
    },
    {
      key: 'actions_website',
      name: 'Actions website',
    },
    {
      key: 'queries_chain',
      name: 'Queries chain',
    },
    {
      key: 'queries_direct',
      name: 'Queries Direct',
    },
    {
      key: 'queries_indirect',
      name: 'Queries Indirect',
    },
    {
      key: 'views_maps',
      name: 'Views Maps',
    },
    {
      key: 'views_search',
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
