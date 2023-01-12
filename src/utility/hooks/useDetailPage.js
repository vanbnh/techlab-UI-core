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
  const [notFound, setNotFound] = useState(false)
  const {data, isLoading, isError} = useQuery([key, id], async () => {
    let d = null
    if (params) {
      const response = await axios
        .get(`${url}details/`, {params})
        .then(res => res.data)
      if (response) {
        d = response.data
      }
    } else {
      const response = await axios.get(`${url}${id}/`).then(res => res.data)
      if (response) {
        d = response.data
      }
    }

    return d
  })

  useEffect(() => {
    if (data) {
      if (!data.updated_at) {
        data.updated_at = data.created_at
      }

      const dataSerializer = serializerFunc(data, columns)

      setDetail(dataSerializer)
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      setNotFound(true)
    }
  }, [isError])

  return {detail, isLoading, notFound}
}
