import { QueryClient ***REMOVED*** from 'react-query'
import { persistQueryClient ***REMOVED*** from 'react-query/persistQueryClient-experimental'
import { createLocalStoragePersistor ***REMOVED*** from 'react-query/createLocalStoragePersistor-experimental'

let queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24,
  ***REMOVED***,
***REMOVED***,
***REMOVED***)
const localStoragePersistor = createLocalStoragePersistor()

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
***REMOVED***)
// queryClient = persistWithLocalStorage(queryClient)
export default queryClient
