import axios from 'axios'
import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'

export const serializerFunc = (data, columns, compare = false) =>
  columns.reduce((acc, cur) => {
    let value = ''

    if (cur.cell) {
      value = cur.cell(data)
    } else {
      value = data[cur.name]
    }

    if (cur.value_compare && compare) {
      value = cur.value_compare(data)
    }

    if (!cur.isDetailHidden) {
      acc[cur.title] = value
    }

    return acc
  }, {})

export default function useDetailPage({columns, key, url, params}) {
  // *** HOOKS ***
  const {id} = useParams()
  const [detail, setDetail] = useState(null)
  const [versions, setVersions] = useState([])
  const [notFound, setNotFound] = useState(false)
  const {data, isLoading, isError} = useQuery([key, id, params], async () => {
    if (params) {
      return await axios.get(`${url}details/`, {params}).then(res => res.data)
    } else {
      return await axios.get(`${url}${id}/`).then(res => res.data)
    }
  })

  useEffect(() => {
    if (data?.data) {
      const d = data.data
      const v = data.versions
      if (!d.updated_at) {
        d.updated_at = d.created_at
      }

      const dataSerializer = serializerFunc(d, columns)

      setDetail(dataSerializer)

      if (v) {
        setVersions(v)
      }
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      setNotFound(true)
    }
  }, [isError])

  return {detail, setDetail, versions, data: data?.data, isLoading, notFound}
}
