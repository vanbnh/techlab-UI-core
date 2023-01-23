import axios from 'axios'
import {useQuery} from 'react-query'

export const useGetAllClients = () =>
  useQuery(['ALL_CLIENTS'], async () => {
    return await axios
      .get('/client/', {params: {page: 1, limit: 999}})
      .then(res => res.data)
  })
