export const configs = {
  entries: 'Accounts',
  settings: ['export', 'select', 'filter', 'search', 'pagination'],
}
export const formatAccountData = data =>
  data.map(d => ({
    ...d,
    client_name: d.client?.client_name,
  }))
