import {Link} from 'react-router-dom'
import menuConfigs from '../../../../configs/menu'
import {formatDate} from '../../../../utility/Utils'

const COLUMN_MAIN = [
  {
    title: 'ID',
    name: 'location_id',
    isLink: true,
    to: row => `${menuConfigs.location.path}/${row.location_id}`,
    width: 210,
  },
  {
    title: 'LOCATION NAME',
    name: 'location_name',
    isLink: true,
    to: row => `${menuConfigs.location.path}/${row.location_id}`,
    value_compare: row => row.location_name,
    cell: row => (
      <Link to={`${menuConfigs.location.path}/${row.location_id}`}>
        {row.location_name}
      </Link>
    ),
  },
  {
    title: 'GMB ACCOUNT',
    name: 'gmb_account_name',
    isLink: true,
    filterKey: 'gmb_account__account_name',
    to: row => `${menuConfigs.account.path}/${row.gmb_account_id}`,
    value_compare: row => row.gmb_account?.account_name,
    cell: row =>
      row.gmb_account && (
        <Link to={`${menuConfigs.account.path}/${row.gmb_account_id}`}>
          {row.gmb_account.account_name}
        </Link>
      ),
  },
  {
    title: 'CLIENT NAME',
    name: 'client_name',
    isLink: true,
    filterKey: 'gmb_account__client__client_name',
    to: row => `${menuConfigs.client.path}/${row.client_id}`,
    value_compare: row => row.gmb_account.client?.client_id,
    cell: row =>
      row.gmb_account && (
        <Link
          to={`${menuConfigs.client.path}/${row.gmb_account.client?.client_id}`}
        >
          {row.gmb_account?.client?.client_name}
        </Link>
      ),
  },
  {
    title: 'ADDRESS ADMIN AREA',
    name: 'address_admin_area',
  },
  {
    title: 'LANGUAGE CODE',
    name: 'address_language_code',
  },
  {
    title: 'ADDRESS LINE',
    name: 'address_lines',
    cell: row => row.address_lines?.join(', '),
  },
  {
    title: 'ADDRESS LOCALITY',
    name: 'address_locality',
  },
  {
    title: 'ADDRESS ORGANIZATION',
    name: 'address_organization',
  },
  {
    title: 'ADDRESS RECIPIENTS',
    name: 'address_recipients',
    cell: row => row.address_recipients?.join(', '),
  },
  {
    title: 'ADDRESS POSTAL CODE',
    name: 'address_postal_code',
  },
  {
    title: 'ADDRESS REGION',
    name: 'address_region',
  },
  {
    title: 'ADDRESS SUBLOCALITY',
    name: 'address_sublocality',
  },
  {
    title: 'LABELS',
    name: 'labels',
    cell: row => row.labels?.join(', '),
  },
  {
    title: 'STORE CODE',
    name: 'store_code',
  },
  {
    title: 'LOCATION PATH',
    name: 'location_path',
  },
  {
    title: 'UPDATED DATE',
    name: 'updated_at',
    isDate: true,
    cell: row => row.updated_at && formatDate(row.updated_at),
  },
]
export default COLUMN_MAIN
