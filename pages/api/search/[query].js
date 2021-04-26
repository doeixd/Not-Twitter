import { search } from '../../../lib/search'
import { getSession } from 'next-auth/client'

export default async function handler (req, res) {
  const {query: {query}}  = req
  console.log({query});
  let { user: { id: currentUserID } } = await getSession({ req })
  console.log({currentUserID});
  try {
    const searchResults = await search(query, currentUserID)
    console.log({searchResults});
    return res.json(searchResults)
  } catch(error) {
    return res.status(400)
  }
}
