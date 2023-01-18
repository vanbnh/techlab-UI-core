import {Link} from 'react-router-dom'
import menuConfigs from '../../../../configs/menu'
import {formatDate} from '../../../../utility/Utils'

const COLUMN_MAIN = [
  {
    title: 'ID',
    name: 'post_id',
    isLink: true,
    width: 210,
    to: row => `${menuConfigs.post.path}/${row.post_id}`,
  },
  {
    title: 'LOCATION NAME',
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
    title: 'CLIENT NAME',
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
    title: 'ACTION TYPE',
    name: 'action_type',
  },
  {
    title: 'ACTION URL',
    name: 'action_url',
  },
  {
    title: 'POST PATH',
    name: 'post_path',
  },
  {
    title: 'SEARCH URL',
    name: 'search_url',
  },
  {
    title: 'POST STATE',
    name: 'post_state',
  },
  {
    title: 'SUMMARY',
    name: 'summary',
    cell: row =>
      row.summary && row.summary.length > 50
        ? row.summary.slice(0, 50) + '...'
        : row.summary,
  },
  {
    title: 'TOPIC TYPE',
    name: 'topic_type',
  },
  {
    title: 'ALERT TYPE',
    name: 'alert_type',
  },
  {
    title: 'MEDIA FORMAT',
    name: 'media_format',
  },
  {
    title: 'SOURCE URL',
    name: 'source_url',
  },
  {
    title: 'DATA REFERENCE',
    name: 'data_ref',
  },
  {
    title: 'EVENT TITLE',
    name: 'event_title',
  },
  {
    title: 'START DATE',
    name: 'start_date',
    isDate: true,
    cell: row => row.start_date && formatDate(row.start_date),
  },
  {
    title: 'START TIME',
    name: 'start_time',
    // cell: (row) => row.start_time && formatDate(row.start_time),
  },
  {
    title: 'END DATE',
    name: 'end_date',
    isDate: true,
    cell: row => row.end_date && formatDate(row.end_date),
  },
  {
    title: 'END TIME',
    name: 'end_time',
    // cell: (row) => row.end_time && formatDate(row.end_time),
  },
  {
    title: 'POST CREATE TIME',
    name: 'post_create_time',
    isDate: true,
    cell: row => formatDate(row.post_create_time),
  },
  {
    title: 'POST UPDATE TIME',
    name: 'post_update_time',
    isDate: true,
    cell: row => formatDate(row.post_update_time),
  },
  {
    title: 'COUPON CODE',
    name: 'coupon_code',
  },
  {
    title: 'COUNPON URL',
    name: 'coupon_url',
  },
  {
    title: 'COUPON TERMS',
    name: 'coupon_terms',
  },
]
export default COLUMN_MAIN
