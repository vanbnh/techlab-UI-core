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
    title: 'post id',
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
    title: 'client',
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
    title: 'local post views search',
    name: 'local_post_views_search',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
    width: 150,
  },
  {
    title: 'local post actions call to action',
    name: 'local_post_actions_call_to_action',
    align: 'right',
    summaries: ['min', 'max', 'avg', 'sum'],
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
