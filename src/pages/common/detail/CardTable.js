import React from 'react'
import {Card, CardBody} from 'reactstrap'

const CardTableDetail = ({data}) => {
  const renderBody = () => (
    <table className="table table-responsive table-modern">
      <tbody>
        {Object.keys(data).map(key => (
          <tr key={key}>
            <td className="fw-bold text-nowrap">{key && key.toUpperCase()}</td>
            <td
              className="text-nowrap"
              style={{maxWidth: '60vw', overflow: 'auto'}}
            >
              {data[key]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  if (!data) return null

  return (
    <Card>
      <CardBody className="overflow-auto">{renderBody()}</CardBody>
    </Card>
  )
}

export default CardTableDetail
