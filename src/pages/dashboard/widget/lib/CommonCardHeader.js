import React from 'react'
import {CardHeader} from 'reactstrap'
import {getIcon} from '../../store/function'

const CommonCardHeader = ({item, isEdit, isTable, pageSizeComp, children}) => {
  const {icon, name} = item

  return (
    <CardHeader className={isTable ? 'pb-0' : ''}>
      <div className="text-primary d-flex align-items-center">
        <div className="me-50">{getIcon(icon)}</div>
        <div>{name}</div>
        {pageSizeComp && <div className="ms-1">{pageSizeComp}</div>}
      </div>
      {!isEdit && children}
    </CardHeader>
  )
}

export default CommonCardHeader
