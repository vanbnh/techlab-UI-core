import {Col, Row} from 'reactstrap'
import DownloadReportCard from './components/card'
import {downloadReportData} from './data'

const ExportReports = () => {
  return (
    <>
      <Row>
        {downloadReportData.map(item => (
          <Col key={item.url} md="4">
            <DownloadReportCard data={item} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default ExportReports
