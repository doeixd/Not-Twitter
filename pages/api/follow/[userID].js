
import User from '../../../data/Users'
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'
import { notify } from '../../../lib/notify'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).end()

  try {
    let { user: { id: currentUserID } } = await getSession({ req }) 
      
    let { query: { userID: requestedUserID, fields, handle }} = req

    
    const follower = await User.findByIdAndUpdate(new ObjectId(currentUserID), {$push: {following: requestedUserID}, $inc:{followingCount: 1}})
    const followee = await User.findByIdAndUpdate(new ObjectId(requestedUserID), {$push: {followers: currentUserID}, $inc:{followerCount: 1}})

    await notify({action: 'follow', actorID: currentUserID, objectID: requestedUserID})

    return res.status(200).end()
  } catch (error) {
    return res.status(400).end()
  }

}