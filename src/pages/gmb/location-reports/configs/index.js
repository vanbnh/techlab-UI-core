import columns from '../columns/main'
export const configs = {
  entries: 'Location Reports',
  settings: [
    'export',
    'select',
    'reordering',
    'filter',
    'search',
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
}
export const formatRowData = data =>
  data.map((d, idx) => ({
    ...d,
    id: `${new Date().getTime()}_${idx}`,
  }))
