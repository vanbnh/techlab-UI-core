import React from 'react'
import {Link} from 'react-router-dom'
import {Breadcrumb, BreadcrumbItem} from 'reactstrap'

const BreadcrumbDetail = ({data}) => {
  const {parentName, parentTo, activeName} = data
  if (!data) return null
  return (
    <>
      <Breadcrumb className="breadcrumb-chevron">
        <BreadcrumbItem>
          <Link to="/"> Home </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={parentTo}> {parentName} </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> {activeName} </span>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  )
}

export default BreadcrumbDetail
