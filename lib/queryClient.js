import { QueryClient } from 'react-query'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createLocalStoragePersistor } from 'react-query/createLocalStoragePersistor-experimental'

let queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
})
const localStoragePersistor = createLocalStoragePersistor()

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
})
// queryClient = persistWithLocalStorage(queryClient)
export default queryClient
