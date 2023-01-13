export const configs = {
  entries: 'Accounts',
  settings: [
    'export',
    'select',
    'reordering',
    'filter',
    'search',
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
}
export const formatRowData = data =>
  data.map(d => ({
    ...d,
    client_name: d.client?.client_name,
  }))
