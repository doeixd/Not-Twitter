import User from '../data/Users';
import { ObjectId } from 'mongodb'

export async function notify ({ action, actorID, objectID, receiverID}) {
  try {
    if(!(action || actorID || objectID)) throw 'Missing Argument to Notify Function'
    objectID = new ObjectId(objectID)
    actorID = new ObjectId(actorID)
    receiverID = new ObjectId(receiverID)

    let matchExpression =
      action == 'mention'
        ? {_id: receiverID}
        : action == 'follow'
          ? {_id: objectID}
          : {'posts': {_id: objectID}}

    console.log({matchExpression})
    const user = await User.findOneAndUpdate(matchExpression, {$push: {notifications: {action, actorID, objectID}}} )
    console.log({user})
  }

  catch (error) {
    return new Error('Unable to Notify', error)
  }
}

