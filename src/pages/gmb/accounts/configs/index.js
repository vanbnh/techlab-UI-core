import columns from '../columns/main'
export const configs = {
  entries: 'Accounts',
  settings: [
    'exporting',
    'selecting',
    'reordering',
    'filtering',
    'searching',
    'pagination',
  ],
  keys: {
    list: 'GMB_ACCOUNTS',
    detail: 'GMB_ACCOUNT_DETAIL',
  },
  urls: {
    list: '/gmb-account/',
    detail: '/gmb-account/',
  },
  columns,
  path: '/gmb/accounts',
  fixedColumns: {
    left: ['account_id', 'account_name'],
    right: [],
  },
}
export const formatRowData = data =>
  data.map(d => ({
    ...d,
    client_name: d.client?.client_name,
  }))
