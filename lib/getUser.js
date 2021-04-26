import Users from '../data/Users.js'
import { ObjectId ***REMOVED*** from 'mongodb'

const defaultFields = 'id name handle followerCount followingCount image about createdAt likes'
export async function getUser(requestedUser, currentUserID, fieldsToReturn = defaultFields , updater) {
  try {
    requestedUser = convertIDs(requestedUser, currentUserID)
    const filter ={$or: [{'_id': {$in: requestedUser***REMOVED******REMOVED***, {'handle':{$in: requestedUser***REMOVED******REMOVED***]***REMOVED***
    // const users = await Users[operation](...args)
    updater && await Users.aggregate([
      {$match: filter***REMOVED***,
      updater,
      {$merge: { into: "users", on: "_id" ***REMOVED******REMOVED***
    ])

    const users = await Users.find(filter, fieldsToReturn)

    return (users?.length ?? 0) == 1 ? users[0] : users
***REMOVED*** catch (error) {
    return null
***REMOVED***
***REMOVED***

function convertIDs (requestedUser, currentUserID) {
  requestedUser =
    Array.isArray(requestedUser)
    ? requestedUser
    : [requestedUser]
    .map(i => {
      const id = new ObjectId(i)
      const isHandle = id.valueOf() != i
      return isHandle ? i : id
  ***REMOVED***)

  // If no userID is provided, then use the current user id
  requestedUser = (requestedUser.length && requestedUser) || [new ObjectId (currentUserID)] || false
  if(!requestedUser) throw new Error('No Requested User')
  return requestedUser
***REMOVED***
