import React from 'react'
import {useLocation} from 'react-router-dom'
import menuConfigs from '../../../configs/menu'
import useDetailPage from '../../../utility/hooks/useDetailPage'
import {searchParamtoObject} from '../../../utility/Utils'
import BreadcrumbDetail from '../../common/detail/Breadcrumb'
import CardLoadingDetail from '../../common/detail/CardLoading'
import CardTableDetail from '../../common/detail/CardTable'
import NotFoundDetail from '../../common/detail/NotFound'
import columns from './columns/main'
import {configs} from './configs'

const PostReportDetailPage = () => {
  const {urls, keys, entries} = configs
  const {search} = useLocation()
  const params = searchParamtoObject(search)
  const postId = params?.path?.split('/')[5]
  const {detail, isLoading, notFound} = useDetailPage({
    columns,
    key: keys.detail,
    url: urls.detail,
    params,
  })

  if ((isLoading || !detail) && !notFound)
    return <CardLoadingDetail rows={Object.keys(columns).length} />

  const parentTo = menuConfigs.report.post.path

  return (
    <>
      <div className="mb-1">
        <BreadcrumbDetail
          data={{
            parentName: entries,
            parentTo,
            activeName: postId,
          }}
        />
      </div>
      {notFound ? (
        <NotFoundDetail id={postId} to={parentTo} />
      ) : (
        <CardTableDetail data={detail} />
      )}
    </>
  )
}

export default PostReportDetailPage
