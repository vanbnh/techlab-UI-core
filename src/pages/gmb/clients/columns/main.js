import menuConfigs from '../../../../configs/menu'
import {formatDate} from '../../../../utility/Utils'

const COLUMN_MAIN = [
  {
    title: 'ID',
    name: 'client_id',
    isLink: true,
    to: row => `${menuConfigs.client.path}/${row.client_id}`,
    width: 50,
  },
  {
    title: 'CLIENT NAME',
    name: 'client_name',
    isLink: true,
    to: row => `${menuConfigs.client.path}/${row.client_id}`,
    width: 200,
  },
  {
    title: 'UPDATED DATE',
    name: 'updated_at',
    isDate: true,
    cell: row => row.updated_at && formatDate(row.updated_at),
  },
  {
    title: 'CREATED DATE',
    name: 'created_at',
    isDate: true,
    cell: row => row.created_at && formatDate(row.created_at),
  },
]
export default COLUMN_MAIN
