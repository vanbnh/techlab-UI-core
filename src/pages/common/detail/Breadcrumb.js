import React from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import {Breadcrumb, BreadcrumbItem} from 'reactstrap'

const BreadcrumbDetail = ({data}) => {
  const {t} = useTranslation()
  const {parentName, parentTo, activeName} = data
  if (!data) return null
  return (
    <>
      <Breadcrumb className="breadcrumb-dashes">
        <BreadcrumbItem>
          <Link to="/">{t('Home')}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={parentTo}>{t(parentName)}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> {activeName} </span>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  )
}

export default BreadcrumbDetail
