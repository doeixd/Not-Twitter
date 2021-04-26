
import User from '../../../data/Users'
import { ObjectId ***REMOVED*** from 'mongodb'
import { getSession ***REMOVED*** from 'next-auth/client'
import { notify ***REMOVED*** from '../../../lib/notify'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).end()

  try {
    let { user: { id: currentUserID ***REMOVED*** ***REMOVED*** = await getSession({ req ***REMOVED***) 
      
    let { query: { userID: requestedUserID, fields, handle ***REMOVED******REMOVED*** = req

    
    const follower = await User.findByIdAndUpdate(new ObjectId(currentUserID), {$push: {following: requestedUserID***REMOVED***, $inc:{followingCount: 1***REMOVED******REMOVED***)
    const followee = await User.findByIdAndUpdate(new ObjectId(requestedUserID), {$push: {followers: currentUserID***REMOVED***, $inc:{followerCount: 1***REMOVED******REMOVED***)

    await notify({action: 'follow', actorID: currentUserID, objectID: requestedUserID***REMOVED***)

    return res.status(200).end()
***REMOVED*** catch (error) {
    return res.status(400).end()
***REMOVED***

***REMOVED***