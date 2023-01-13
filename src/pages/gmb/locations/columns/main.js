import {Link} from 'react-router-dom'
import menuConfigs from '../../../../configs/menu'
import {formatDate} from '../../../../utility/Utils'

const COLUMN_MAIN = [
  {
    title: 'id',
    name: 'location_id',
    isLink: true,
    to: row => `${menuConfigs.location.path}/${row.location_id}`,
    width: 210,
  },
  {
    title: 'location name',
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
    title: 'gmb account',
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
    title: 'client',
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
    title: 'address admin area',
    name: 'address_admin_area',
  },
  {
    title: 'Language',
    name: 'address_language_code',
  },
  {
    title: 'address lines',
    name: 'address_lines',
    cell: row => row.address_lines?.join(', '),
  },
  {
    title: 'address locality',
    name: 'address_locality',
  },
  {
    title: 'address organization',
    name: 'address_organization',
  },
  {
    title: 'address recipients',
    name: 'address_recipients',
    cell: row => row.address_recipients?.join(', '),
  },
  {
    title: 'address postal code',
    name: 'address_postal_code',
  },
  {
    title: 'address region',
    name: 'address_region',
  },
  {
    title: 'address sublocality',
    name: 'address_sublocality',
  },
  {
    title: 'labels',
    name: 'labels',
    cell: row => row.labels?.join(', '),
  },
  {
    title: 'store code',
    name: 'store_code',
  },
  {
    title: 'location path',
    name: 'location_path',
  },
  {
    title: 'Update date',
    name: 'updated_at',
    isDate: true,
    cell: row => row.updated_at && formatDate(row.updated_at),
  },
]
export default COLUMN_MAIN
