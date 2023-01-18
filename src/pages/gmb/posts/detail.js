import React from 'react'
import {useParams} from 'react-router-dom'
import {Col, Row} from 'reactstrap'
import menuConfigs from '../../../configs/menu'
import useVersionDetailPage from '../../../utility/hooks/useVersionDetailPage'
import {
  BreadcrumbDetail,
  CardLoadingDetail,
  VersionDetail,
  NotFoundDetail,
  CardTableDetail,
} from '../../common/detail'
import columns from './columns/main'
import {configs} from './configs'

const parentTo = menuConfigs.post.path

const PostDetailPage = () => {
  const {urls, keys, entries} = configs
  const {id} = useParams()
  const {
    detail,
    versions,
    isLoading,
    notFound,
    isShowCompare,
    dataVersionCurrent,
    dataVersionCompare,
    isLoadingVersion,
    versionSelect,
    setVersionSelect,
    onSetDataVersionCompare,
    onCancelCompare,
  } = useVersionDetailPage({keys, urls, columns})

  if ((isLoading || !detail) && !notFound)
    return <CardLoadingDetail rows={Object.keys(columns).length} />

  return (
    <>
      <Row className="mb-1">
        <Col sm="6">
          <BreadcrumbDetail
            data={{
              parentName: entries,
              parentTo,
              activeName: notFound ? id : detail['ID'],
            }}
          />
        </Col>
        <Col sm="6">
          <VersionDetail
            versions={versions}
            isShowCompare={isShowCompare}
            onSetDataVersionCompare={onSetDataVersionCompare}
            onCancelCompare={onCancelCompare}
            versionSelect={versionSelect}
            setVersionSelect={setVersionSelect}
          />
        </Col>
      </Row>
      {notFound ? (
        <NotFoundDetail id={id} to={parentTo} />
      ) : (
        <CardTableDetail
          data={detail}
          dataVersionCurrent={dataVersionCurrent}
          dataVersionCompare={dataVersionCompare}
          isLoadingVersion={isLoadingVersion}
        />
      )}
    </>
  )
}

export default PostDetailPage
