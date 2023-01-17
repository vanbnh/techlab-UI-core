import {Link} from 'react-router-dom'
import menuConfigs from '../../../../configs/menu'
import {formatDate} from '../../../../utility/Utils'

const COLUMN_MAIN = [
  {
    title: 'Actions',
    name: 'actions',
    isDetailHidden: true,
  },
  {
    title: 'location',
    name: 'location_name',
    isLink: true,
    align: 'left',
    width: 180,
    filterKey: 'location__location_name',
    to: row => `${menuConfigs.location.path}/${row?.location_id}`,
    cell: row => (
      <Link to={`${menuConfigs.location.path}/${row.location?.location_id}`}>
        {row?.location.location_name}
      </Link>
    ),
  },
  {
    title: 'client',
    name: 'client_name',
    isLink: true,
    align: 'left',
    width: 110,
    filterKey: 'location__gmb_account__client__client_name',
    to: row => `${menuConfigs.client.path}/${row.client_id}`,
    value_compare: row => row.location?.gmb_account.client?.client_id,
    cell: row => (
      <Link
        to={`${menuConfigs.client.path}/${row.location?.gmb_account.client?.client_id}`}
      >
        {row.location?.gmb_account?.client?.client_name}
      </Link>
    ),
  },
  {
    title: 'queries direct',
    name: 'queries_direct',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'queries chain',
    name: 'queries_chain',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'views search',
    name: 'views_search',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'views maps',
    name: 'views_maps',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'Views search',
    name: 'local_post_views_search',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'Actions call to action',
    name: 'local_post_actions_call_to_action',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'actions website',
    name: 'actions_website',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'actions driving directions',
    name: 'actions_driving_directions',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'actions phone',
    name: 'actions_phone',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'photos views merchant',
    name: 'photos_views_merchant',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'photos views customers',
    name: 'photos_views_customers',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'photos count merchant',
    name: 'photos_count_merchant',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'photos count customers',
    name: 'photos_count_customers',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'report date',
    name: 'report_date',
    isDate: true,
  },
  {
    title: 'update date',
    name: 'updated_at',
    isDate: true,
    cell: row => formatDate(row.updated_at),
  },
  {
    title: 'created date',
    name: 'created_at',
    isDate: true,
    cell: row => formatDate(row.created_at),
  },
  {
    title: 'download',
    name: 'download_csv',
    width: 100,
    isDetailHidden: true,
  },
]
export default COLUMN_MAIN
