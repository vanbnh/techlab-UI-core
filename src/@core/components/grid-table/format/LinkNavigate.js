import React from 'react'
import {useNavigate} from 'react-router-dom'
import {DataTypeProvider} from '@devexpress/dx-react-grid'

const LinkFormatter = ({value, row, column}) => {
  const navigate = useNavigate()
  const isvalidLink =
    column.validLink !== undefined ? column.validLink(row) : true
  return (
    <button
      type="button"
      onClick={() => isvalidLink && navigate(column.to(row))}
      className={`${
        isvalidLink
          ? 'cursor-pointer text-decoration-underline text-primary'
          : ''
      } border-0 bg-transparent`}
    >
      {value}
    </button>
  )
}

const LinkNavigateProvider = props => (
  <DataTypeProvider formatterComponent={LinkFormatter} {...props} />
)

export default LinkNavigateProvider
