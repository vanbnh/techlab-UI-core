import React from 'react'
import {useNavigate} from 'react-router-dom'
import {CardHeader, CardLink} from 'reactstrap'
import {getIcon} from '../../store/function'

const CommonCardHeader = ({
  item,
  isEdit,
  path,
  isTable,
  pageSizeComp,
  children,
}) => {
  const {icon, name} = item

  const navigate = useNavigate()

  return (
    <CardHeader className={isTable ? 'pb-0' : ''}>
      <div className="text-primary d-flex align-items-center">
        <div className="me-50">{getIcon(icon)}</div>

        {path ? (
          <CardLink onClick={() => navigate(path)}>{name}</CardLink>
        ) : (
          <div>{name}</div>
        )}
        {pageSizeComp && <div className="ms-1">{pageSizeComp}</div>}
      </div>
      {!isEdit && children}
    </CardHeader>
  )
}

export default CommonCardHeader
