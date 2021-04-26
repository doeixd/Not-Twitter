import User from '../../data/Users'
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  // if (req.method !== 'GET') return res.status(400).send()
  console.log('HIT!!')
  try {
    let { user: { id: currentUserID } } = await getSession({ req })
    if(!currentUserID) throw new Error('Not signed In')
    currentUserID = new ObjectId(currentUserID)

    const { notifications } = await User.findById({_id: currentUserID }, 'notifications')

    console.log({notifications});
    return res.json(notifications)

  }

  catch (error) {
    return res.status(400).send()
  }

}
