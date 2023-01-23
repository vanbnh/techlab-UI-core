import {useEffect} from 'react'
import {useGetAllClients} from '../../clients/hook'

export const useGetClientOptions = (columns, setColumns) => {
  const {data: clients} = useGetAllClients()
  useEffect(() => {
    if (clients?.data) {
      const clientColumn = columns.find(c => c.name === 'client_name')
      if (clientColumn) {
        clientColumn.options = clients.data.map(c => ({
          value: c.client_id,
          label: c.client_name,
        }))
        setColumns([...columns])
      }
    }
  }, [clients])
}
