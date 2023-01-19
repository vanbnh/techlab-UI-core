import columns from '../columns/main'
export const configs = {
  entries: 'Clients',
  settings: [
    'exporting',
    'selecting',
    'reordering',
    'filtering',
    'searching',
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
  columns,
  path: '/gmb/clients',
  fixedColumns: {
    left: ['client_id', 'client_name'],
    right: [],
  },
}
export const formatRowData = data =>
  data.map(d => ({
    ...d,
    client_name: d.client_name,
  }))
