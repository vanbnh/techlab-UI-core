import {useTranslation} from 'react-i18next'
import {Col, Row} from 'reactstrap'
import TabComponent from '../../../@core/components/tabs'
import UploadReportCard from './components/card'
import {uploadLocationData, uploadPostData} from './data'

const ExportReports = () => {
  const {t} = useTranslation()

  const DATA = [
    {
      id: 1,
      name: t('Location Upload'),
      component: (
        <div>
          <Row>
            {uploadLocationData.map(item => (
              <Col key={item.key} md="6">
                <UploadReportCard data={item} />
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
    {
      id: 2,
      name: t('Local Post Upload'),
      component: (
        <div>
          <Row>
            {uploadPostData.map(item => (
              <Col key={item.key} md="6">
                <UploadReportCard data={item} />
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
  ]

  return (
    <>
      <TabComponent data={DATA} pills />
    </>
  )
}

export default ExportReports
