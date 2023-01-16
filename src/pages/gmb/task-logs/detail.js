import React from 'react'
import {useParams} from 'react-router-dom'
import menuConfigs from '../../../configs/menu'
import useDetailPage from '../../../utility/hooks/useDetailPage'
import BreadcrumbDetail from '../../common/detail/Breadcrumb'
import CardLoadingDetail from '../../common/detail/CardLoading'
import NotFoundDetail from '../../common/detail/NotFound'
import columns from './columns/main'
import {configs} from './configs'
import TableRowDetailMonitoringTaskLog from './provider/RowDetail'

const MonitoringTaskLogDetailPage = () => {
  const {id} = useParams()
  const {urls, keys, entries} = configs
  const {data, isLoading, notFound} = useDetailPage({
    columns,
    key: keys.detail,
    url: urls.detail,
  })

  const parentTo = menuConfigs.monitoring.task_log.path

  if ((isLoading || !data) && !notFound)
    return <CardLoadingDetail rows={Object.keys(columns).length} />

  return (
    <>
      <div className="mb-1">
        <BreadcrumbDetail
          data={{
            parentName: entries,
            parentTo,
            activeName: notFound ? id : data?.task_id,
          }}
        />
      </div>

      {notFound ? (
        <NotFoundDetail id={id} to={parentTo} />
      ) : (
        <TableRowDetailMonitoringTaskLog row={data} />
      )}
    </>
  )
}

export default MonitoringTaskLogDetailPage
