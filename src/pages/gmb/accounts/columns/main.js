import {Link} from 'react-router-dom'
import menuConfigs from '../../../../configs/menu'
import {formatDate} from '../../../../utility/Utils'

const COLUMN_MAIN = [
  {
    title: 'ID',
    name: 'account_id',
    isLink: true,
    align: 'left',
    to: row => `${menuConfigs.account.path}/${row.account_id}`,
    width: 200,
  },
  {
    title: 'ACCOUNT NAME',
    name: 'account_name',
    isLink: true,
    to: row => `${menuConfigs.account.path}/${row.account_id}`,
    align: 'left',
    width: 120,
  },
  {
    title: 'CLIENT NAME',
    name: 'client_name',
    isLink: true,
    // isGroup: true,
    to: row => `${menuConfigs.client.path}/${row.client.client_id}`,
    align: 'left',
    width: 120,
    filterKey: 'client__client_name',
    // Detail page
    cell: row => (
      <Link
        to={`${menuConfigs.client.path}/${row.client.client_id}`}
        className="cursor-pointer text-decoration-underline text-primary border-0 bg-transparent"
      >
        {row.client.client_name}
      </Link>
    ),
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
