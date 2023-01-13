import {Link} from 'react-router-dom'
import menuConfigs from '../../../../configs/menu'
import {formatDate} from '../../../../utility/Utils'

const COLUMN_MAIN = [
  {
    title: 'id',
    name: 'post_id',
    isLink: true,
    width: 210,
    to: row => `${menuConfigs.post.path}/${row.post_id}`,
  },
  {
    title: 'location',
    name: 'location_name',
    align: 'left',
    isLink: true,
    filterKey: 'location__location_name',
    to: row => `${menuConfigs.location.path}/${row.location_id}`,
    value_compare: row => row.location?.location_name,
    width: 200,
    cell: row => (
      <Link to={`${menuConfigs.location.path}/${row.location.location_id}`}>
        {row.location?.location_name}
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
    value_compare: row => row.location?.gmb_account?.client?.client_id,
    cell: row => (
      <Link
        to={`${menuConfigs.client.path}/${row.location?.gmb_account?.client?.client_id}`}
      >
        {row.location?.gmb_account?.client?.client_name}
      </Link>
    ),
  },
  {
    title: 'action type',
    name: 'action_type',
  },
  {
    title: 'action url',
    name: 'action_url',
  },
  {
    title: 'post path',
    name: 'post_path',
  },
  {
    title: 'search url',
    name: 'search_url',
  },
  {
    title: 'post state',
    name: 'post_state',
  },
  {
    title: 'summary',
    name: 'summary',
    cell: row =>
      row.summary && row.summary.length > 50
        ? row.summary.slice(0, 50) + '...'
        : row.summary,
  },
  {
    title: 'topic type',
    name: 'topic_type',
  },
  {
    title: 'alert type',
    name: 'alert_type',
  },
  {
    title: 'media format',
    name: 'media_format',
  },
  {
    title: 'source url',
    name: 'source_url',
  },
  {
    title: 'data ref',
    name: 'data_ref',
  },
  {
    title: 'event title',
    name: 'event_title',
  },
  {
    title: 'start date',
    name: 'start_date',
    isDate: true,
    cell: row => row.start_date && formatDate(row.start_date),
  },
  {
    title: 'start time',
    name: 'start_time',
    // cell: (row) => row.start_time && formatDate(row.start_time),
  },
  {
    title: 'end date',
    name: 'end_date',
    isDate: true,
    cell: row => row.end_date && formatDate(row.end_date),
  },
  {
    title: 'end time',
    name: 'end_time',
    // cell: (row) => row.end_time && formatDate(row.end_time),
  },
  {
    title: 'post create time',
    name: 'post_create_time',
    isDate: true,
    cell: row => formatDate(row.post_create_time),
  },
  {
    title: 'post update time',
    name: 'post_update_time',
    isDate: true,
    cell: row => formatDate(row.post_update_time),
  },
  {
    title: 'coupon code',
    name: 'coupon_code',
  },
  {
    title: 'coupon url',
    name: 'coupon_url',
  },
  {
    title: 'coupon terms',
    name: 'coupon_terms',
  },
]
export default COLUMN_MAIN
