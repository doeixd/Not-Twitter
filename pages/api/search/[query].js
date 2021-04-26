import { search ***REMOVED*** from '../../../lib/search'
import { getSession ***REMOVED*** from 'next-auth/client'

export default async function handler (req, res) {
  const {query: {query***REMOVED******REMOVED***  = req
  console.log({query***REMOVED***);
  let { user: { id: currentUserID ***REMOVED*** ***REMOVED*** = await getSession({ req ***REMOVED***)
  console.log({currentUserID***REMOVED***);
  try {
    const searchResults = await search(query, currentUserID)
    console.log({searchResults***REMOVED***);
    return res.json(searchResults)
***REMOVED*** catch(error) {
    return res.status(400)
***REMOVED***
***REMOVED***
