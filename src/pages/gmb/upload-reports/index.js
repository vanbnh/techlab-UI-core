import {useTranslation} from 'react-i18next'
import {Col, Row} from 'reactstrap'
import UploadReportCard from './components/card'
import {uploadLocationData, uploadPostData} from './data'

const ExportReports = () => {
  const {t} = useTranslation()

  return (
    <>
      <div className="mb-2">
        <h2 className="text-center mb-1 text-primary">
          {t('Location Upload')}
        </h2>
        <Row className="justify-content-center">
          {uploadLocationData.map(item => (
            <Col key={item.key} md="5">
              <UploadReportCard data={item} />
            </Col>
          ))}
        </Row>
      </div>
      <div>
        <h2 className="text-center mb-1 text-info">{t('Local Post Upload')}</h2>
        <Row className="justify-content-center">
          {uploadPostData.map(item => (
            <Col key={item.key} md="5">
              <UploadReportCard data={item} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

export default ExportReports
