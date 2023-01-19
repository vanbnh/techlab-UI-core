import axios from 'axios'
import {useQuery, useQueryClient} from 'react-query'

const handleCallApi = async ({page, query, perPage, filters}) => {
  const params = {
    ...query.params,
    page: page + 1,
    limit: perPage,
  }
  const data = filters.map(f => ({
    key: f.key,
    value: f.value,
    expr: f.condition,
  }))

  return await axios.post(query.url, data, {params}).then(res => res.data)
}

export const useFetchData = ({query, page: currentPage, perPage, filters}) => {
  return useQuery(
    [
      query.key,
      {
        page: currentPage,
        limit: perPage,
        f: filters.map(f => ({[f.key]: f.value})),
      },
      query.params,
    ],
    () => handleCallApi({query, page: currentPage, perPage, filters}),
  )
}

export const usePrefetchData = ({
  dataQuery,
  query,
  page: currentPage,
  perPage,
  filters,
}) => {
  const queryClient = useQueryClient()
  if (dataQuery && dataQuery.metadata && dataQuery.metadata.has_next) {
    const maxPostPage = Number(Math.ceil(dataQuery?.metadata?.total / perPage))
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1
      queryClient.prefetchQuery(
        [
          query.key,
          {
            page: nextPage,
            limit: perPage,
            f: filters.map(f => ({[f.key]: f.value})),
          },
          query.params,
        ],
        () => handleCallApi({query, page: nextPage, perPage, filters}),
      )
    }
  }
}
