import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {Card, CardBody} from 'reactstrap'

const CardLoadingDetail = ({rows = 4}) => {
  return (
    <Card>
      <CardBody>
        <table className="table table-modern">
          <tbody>
            {Array.from({
              length: rows + 2 > 10 ? 10 : rows + 2,
            }).map((_, idx) => (
              <tr key={idx}>
                <td className="fw-bold">
                  <Skeleton height={20} />
                </td>
                <td>
                  <Skeleton height={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}

export default CardLoadingDetail
