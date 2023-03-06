import {useTranslation} from 'react-i18next'
import {Col, Row} from 'reactstrap'
import DownloadReportCard from './components/card'
import {downloadReportDataNew} from './data'

const ExportReports = () => {
  const {i18n} = useTranslation()
  const language = i18n.language

  return (
    <>
      {downloadReportDataNew.map(item => (
        <div className="mb-2 text-center" key={item.jp}>
          <h1>{item[language]}</h1>
          <Row className="mt-2">
            {item.children.map(child => (
              <Col key={child.url} md="4">
                <DownloadReportCard data={child} />
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </>
  )
}

export default ExportReports
