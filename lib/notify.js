import User from '../data/Users';
import { ObjectId ***REMOVED*** from 'mongodb'

export async function notify ({ action, actorID, objectID, receiverID***REMOVED***) {
  try {
    if(!(action || actorID || objectID)) throw 'Missing Argument to Notify Function'
    objectID = new ObjectId(objectID)
    actorID = new ObjectId(actorID)
    receiverID = new ObjectId(receiverID)

    let matchExpression =
      action == 'mention'
        ? {_id: receiverID***REMOVED***
        : action == 'follow'
          ? {_id: objectID***REMOVED***
          : {'posts': {_id: objectID***REMOVED******REMOVED***

    console.log({matchExpression***REMOVED***)
    const user = await User.findOneAndUpdate(matchExpression, {$push: {notifications: {action, actorID, objectID***REMOVED******REMOVED******REMOVED*** )
    console.log({user***REMOVED***)
***REMOVED***

  catch (error) {
    return new Error('Unable to Notify', error)
***REMOVED***
***REMOVED***

