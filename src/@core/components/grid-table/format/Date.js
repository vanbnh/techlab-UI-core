import {DataTypeProvider} from '@devexpress/dx-react-grid'
import React from 'react'

const dateFilterOperations = ['month', 'contains', 'startsWith', 'endsWith']
const DateProvider = props => (
  <DataTypeProvider
    availableFilterOperations={dateFilterOperations}
    {...props}
  />
)

export default DateProvider
