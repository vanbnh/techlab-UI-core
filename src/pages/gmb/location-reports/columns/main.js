import {Link} from 'react-router-dom'
import menuConfigs from '../../../../configs/menu'
import {formatDate} from '../../../../utility/Utils'

const COLUMN_MAIN = [
  {
    title: 'ACTIONS',
    name: 'actions',
    isDetailHidden: true,
  },
  {
    title: 'LOCATION NAME',
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
    title: 'CLIENT NAME',
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
    title: 'QUERIES DIRECT',
    name: 'queries_direct',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'QUERIES CHAIN',
    name: 'queries_chain',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'VIEWS SEARCH',
    name: 'views_search',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'VIEWS MAPS',
    name: 'views_maps',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'LOCAL POST VIEWS SEARCH',
    name: 'local_post_views_search',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'LOCAL POST ACTIONS CTA',
    name: 'local_post_actions_call_to_action',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'ACTIONS WEBSITE',
    name: 'actions_website',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'ACTIONS DRIVING DIRECTIONS',
    name: 'actions_driving_directions',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'ACTIONS PHONE',
    name: 'actions_phone',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'PHOTOS VIEWS MERCHANT',
    name: 'photos_views_merchant',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'PHOTOS VIEWS CUSTOMER',
    name: 'photos_views_customers',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'PHOTOS COUNT MERCHANT',
    name: 'photos_count_merchant',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'PHOTOS COUNT CUSTOMER',
    name: 'photos_count_customers',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    isNumber: true,
    width: 150,
  },
  {
    title: 'REPORT DATE',
    name: 'report_date',
    isDate: true,
  },
  {
    title: 'UPDATED DATE',
    name: 'updated_at',
    isDate: true,
    cell: row => formatDate(row.updated_at),
  },
  {
    title: 'CREATED DATE',
    name: 'created_at',
    isDate: true,
    cell: row => formatDate(row.created_at),
  },
  {
    title: 'DOWNLOAD',
    name: 'download_csv',
    width: 100,
    isDetailHidden: true,
  },
]
export default COLUMN_MAIN
