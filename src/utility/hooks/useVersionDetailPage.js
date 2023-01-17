import axios from 'axios'
import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import useDetailPage, {serializerFunc} from './useDetailPage'

export default function useVersionDetailPage({keys, urls, columns}) {
  // *** OTHER HOOKS ***
  const {detail, setDetail, data, isLoading, notFound, versions} =
    useDetailPage({
      columns,
      key: keys.detail,
      url: urls.detail,
    })
  // *** VERSIONNING ***
  const [versionSelect, setVersionSelect] = useState(0)
  const [isShowCompare, setIsShowCompare] = useState(false)
  const [dataVersionCurrent, setDataVersionCurrent] = useState(null)
  const [dataVersionCompare, setDataVersionCompare] = useState(null)
  const {data: versionData, isLoading: isLoadingVersion} = useQuery(
    [keys.version, versionSelect],
    async () => {
      return await axios
        .get(`${urls.version}${versionSelect}/`)
        .then(res => res.data)
    },
    {
      enabled: !!versionSelect,
    },
  )

  useEffect(() => {
    if (versions.length > 0 && versionSelect) {
      setIsShowCompare(versions[0] !== versionSelect)
    }
  }, [versions, versionSelect])

  useEffect(() => {
    if (versionData?.data) {
      let d = serializerFunc(versionData.data, columns)
      d = Object.keys(d).reduce(
        (acc, cur) => {
          acc[cur] = d[cur]
          return acc
        },
        {'version id': versionSelect},
      )
      setDetail(d)
    }
    setDataVersionCompare(null)
    setDataVersionCurrent(null)
  }, [versionSelect, versionData])

  const onSetDataVersionCompare = () => {
    if (versions.length > 0 && versionSelect && versionData?.data && data) {
      let dataVersionNew = serializerFunc(versionData.data, columns, true)
      dataVersionNew = Object.keys(dataVersionNew).reduce(
        (acc, cur) => {
          acc[cur] = dataVersionNew[cur]
          return {...acc}
        },
        {'version id': versionSelect},
      )
      setDataVersionCompare(dataVersionNew)

      let dataVersionOld = serializerFunc(data, columns, true)
      dataVersionOld = Object.keys(dataVersionOld).reduce(
        (acc, cur) => {
          acc[cur] = dataVersionOld[cur]
          return acc
        },
        {'version id': String(versions[0])},
      )
      setDataVersionCurrent(dataVersionOld)
    }
  }

  const onCancelCompare = () => {
    setVersionSelect(versions[0])
    setDataVersionCompare(null)
    setDataVersionCurrent(null)
  }
  return {
    detail,
    versions,
    isLoading,
    notFound,
    isShowCompare,
    dataVersionCurrent,
    dataVersionCompare,
    isLoadingVersion,
    versionSelect,
    setVersionSelect,
    onSetDataVersionCompare,
    onCancelCompare,
  }
}
