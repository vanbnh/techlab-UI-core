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
    title: 'POST ID',
    name: 'post_id',
    isLink: true,
    filterKey: 'post__post_id',
    to: row => `${menuConfigs.post.path}/${row.post_id}`,
    cell: row => (
      <Link to={`${menuConfigs.post.path}/${row.post?.post_id}`}>
        {row.post?.post_id}
      </Link>
    ),
    width: 180,
  },
  {
    title: 'CLIENT NAME',
    name: 'client_name',
    isLink: true,
    align: 'center',
    width: 110,
    filterKey: 'post__location__gmb_account__client__client_name',
    to: row => `${menuConfigs.client.path}/${row.client_id}`,
    value_compare: row => row.post?.location?.gmb_account.client?.client_id,
    cell: row => (
      <Link
        to={`${menuConfigs.client.path}/${row.post?.location?.gmb_account.client?.client_id}`}
      >
        {row.post?.location?.gmb_account?.client?.client_name}
      </Link>
    ),
  },
  {
    title: 'LOCAL POST VIEWS SEARCH',
    name: 'local_post_views_search',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    width: 150,
  },
  {
    title: 'LOCAL POST ACTIONS CTA',
    name: 'local_post_actions_call_to_action',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
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
