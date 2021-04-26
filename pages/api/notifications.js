import User from '../../data/Users'
import { ObjectId ***REMOVED*** from 'mongodb'
import { getSession ***REMOVED*** from 'next-auth/client'

export default async function handler(req, res) {
  // if (req.method !== 'GET') return res.status(400).send()
  console.log('HIT!!')
  try {
    let { user: { id: currentUserID ***REMOVED*** ***REMOVED*** = await getSession({ req ***REMOVED***)
    if(!currentUserID) throw new Error('Not signed In')
    currentUserID = new ObjectId(currentUserID)

    const { notifications ***REMOVED*** = await User.findById({_id: currentUserID ***REMOVED***, 'notifications')

    console.log({notifications***REMOVED***);
    return res.json(notifications)

***REMOVED***

  catch (error) {
    return res.status(400).send()
***REMOVED***

***REMOVED***
