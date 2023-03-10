import React from 'react'
import {useParams} from 'react-router-dom'
import menuConfigs from '../../../configs/menu'
import useDetailPage from '../../../utility/hooks/useDetailPage'
import BreadcrumbDetail from '../../common/detail/Breadcrumb'
import CardLoadingDetail from '../../common/detail/CardLoading'
import CardTableDetail from '../../common/detail/CardTable'
import NotFoundDetail from '../../common/detail/NotFound'
import columns from './columns/main'
import {configs} from './configs'

const AccountDetailPage = () => {
  const {id} = useParams()
  const {urls, keys, entries} = configs
  const {detail, isLoading, notFound} = useDetailPage({
    columns,
    key: keys.detail,
    url: urls.detail,
  })

  const parentTo = menuConfigs.account.path

  if ((isLoading || !detail) && !notFound)
    return <CardLoadingDetail rows={Object.keys(columns).length} />

  return (
    <>
      <div className="mb-1">
        <BreadcrumbDetail
          data={{
            parentName: entries,
            parentTo,
            activeName: notFound ? id : detail['ACCOUNT NAME'],
          }}
        />
      </div>

      {notFound ? (
        <NotFoundDetail id={id} to={parentTo} />
      ) : (
        <CardTableDetail data={detail} />
      )}
    </>
  )
}

export default AccountDetailPage
