export const configs = {
  entries: 'Post Reports',
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
    list: 'GMB_POST_REPORTS',
    detail: 'GMB_POST_REPORT_DETAIL',
  },
  urls: {
    list: '/post-report/',
    detail: '/post-report/',
  },
  fixedColumns: {
    left: ['post_id', 'client_name'],
    right: ['download_csv'],
  },
}
export const formatRowData = data =>
  data.map((d, idx) => ({
    ...d,
    id: `${new Date().getTime()}_${idx}`,
  }))
