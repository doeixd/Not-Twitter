import { getSession ***REMOVED*** from 'next-auth/client'
import { getUser ***REMOVED*** from '../../../lib/getUser'
// GET http://this-domain.tld/api/users/[userID] => returns a json object with a couple basic fields from the requested user
// GET http://this-domain.tld/api/users/[userID]?fields=name:posts:image => will only return those fields on the user object
// GET http://this-domain.tld/api/users/[userID]?fields=name:posts:image => will only return those fields on the user object
// GET http://this-domain.tld/api/users/[userID]?fields=name:posts:image?handle=true => will only return those fields on the user object
export default async function handler(req, res) {
  if (req.method == 'GET') {
    let { user: { id: currentUserID ***REMOVED*** ***REMOVED*** = await getSession({ req ***REMOVED***) as any
    let { query: { userID: requestedUserID, fields ***REMOVED******REMOVED*** = req

    const user = await getUser(requestedUserID, currentUserID, fields?.split(':')?.join(' ') ?? undefined)
    // console.log({user***REMOVED***)
    return res.json(user)
***REMOVED***

  return res.status(400).end()
***REMOVED***

