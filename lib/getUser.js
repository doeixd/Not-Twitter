import Users from '../data/Users.js'
import { ObjectId } from 'mongodb'

const defaultFields = 'id name handle followerCount followingCount image about createdAt likes'
export async function getUser(requestedUser, currentUserID, fieldsToReturn = defaultFields , updater) {
  try {
    requestedUser = convertIDs(requestedUser, currentUserID)
    const filter ={$or: [{'_id': {$in: requestedUser}}, {'handle':{$in: requestedUser}}]}
    // const users = await Users[operation](...args)
    updater && await Users.aggregate([
      {$match: filter},
      updater,
      {$merge: { into: "users", on: "_id" }}
    ])

    const users = await Users.find(filter, fieldsToReturn)

    return (users?.length ?? 0) == 1 ? users[0] : users
  } catch (error) {
    return null
  }
}

function convertIDs (requestedUser, currentUserID) {
  requestedUser =
    Array.isArray(requestedUser)
    ? requestedUser
    : [requestedUser]
    .map(i => {
      const id = new ObjectId(i)
      const isHandle = id.valueOf() != i
      return isHandle ? i : id
    })

  // If no userID is provided, then use the current user id
  requestedUser = (requestedUser.length && requestedUser) || [new ObjectId (currentUserID)] || false
  if(!requestedUser) throw new Error('No Requested User')
  return requestedUser
}
