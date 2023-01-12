import axios from 'axios'
import React, {useState} from 'react'
import GridTableComponent from '../../../@core/components/grid-table'
import columns from './columns/main'
import {formatRowData, configs} from './configs'
import {saveAs} from 'file-saver'
import {toast} from 'react-hot-toast'

const LocationPage = () => {
  const {entries, settings, keys, urls, fixedColumns} = configs
  const [loading, setLoading] = useState(false)
  const QUERY = {
    url: urls.list,
    key: keys.list,
  }

  const onExport = async rows => {
    if (rows.length > 0) {
      setLoading(true)
      try {
        const response = await axios.post(
          '/file-template/',
          {
            ids: rows.map(r => r.location_id),
            type: 'location',
          },
          {
            responseType: 'blob',
          },
        )
        const blob = new Blob([response.data], {
          type: response.data.type,
        })
        saveAs(blob, 'locations.xlsx')
        if (response.status !== 200) {
          toast.error('Export location from S3 Failed')
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast.error('Export location from S3 Failed')
      }
    }
  }

  return (
    <GridTableComponent
      columns={columns}
      query={QUERY}
      formatData={formatRowData}
      entries={entries}
      settings={settings}
      fixedCols={fixedColumns}
      onExport={onExport}
      loading={loading}
    />
  )
}

export default LocationPage
