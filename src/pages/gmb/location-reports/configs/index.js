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
  },
  urls: {
    list: '/location-report/',
    detail: '/location-report/',
  },
  fixedColumns: {
    left: ['location_name', 'client_name'],
    right: ['download_csv'],
  },
}
export const formatRowData = data =>
  data.map((d, idx) => ({
    ...d,
    id: `${new Date().getTime()}_${idx}`,
  }))
