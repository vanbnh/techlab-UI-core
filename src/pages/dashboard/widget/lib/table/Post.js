import React from 'react'
import {configs, formatRowData} from '../../../../gmb/posts/configs'
import CommonTableWidgetItem from './common'

const PostTable = ({...props}) => {
  return (
    <CommonTableWidgetItem
      configs={configs}
      formatData={formatRowData}
      {...props}
    />
  )
}

export default PostTable
