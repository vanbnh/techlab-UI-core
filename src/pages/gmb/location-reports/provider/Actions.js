import React from 'react'
import {DataTypeProvider} from '@devexpress/dx-react-grid'
import {BarChart2, Eye} from 'react-feather'
import {useNavigate} from 'react-router-dom'
import menuConfigs from '../../../../configs/menu'

export const ActionComponent = ({row}) => {
  const navigate = useNavigate()

  return (
    <div className="d-flex gap-1">
      <Eye
        size={20}
        className="text-primary cursor-pointer"
        onClick={() =>
          navigate(
            `${menuConfigs.report.location.path}/details?path=${row.location_report_path}`,
          )
        }
      />
      <BarChart2
        size={20}
        className="text-primary cursor-pointer"
        onClick={() =>
          navigate(
            `${menuConfigs.report.location.path}/statistic?path=${row.location_report_path}`,
          )
        }
      />
    </div>
  )
}

const ActionsProvider = props => (
  <DataTypeProvider
    for={['actions']}
    formatterComponent={ActionComponent}
    {...props}
  />
)

export default ActionsProvider
