export const configs = {
  entries: 'Clients',
  settings: [
    'export',
    'select',
    'reordering',
    'filter',
    'search',
    'pagination',
  ],
  keys: {
    list: 'GMB_CLIENTS',
    detail: 'GMB_CLIENT_DETAIL',
  },
  urls: {
    list: '/client/',
    detail: '/client/',
  },
}
export const formatRowData = data =>
  data.map(d => ({
    ...d,
    client_name: d.client_name,
  }))
