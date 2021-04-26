
import User from '../../../data/Users'
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {

  if (req.method == 'PUT') {
    const { user: { id: currentUserID } } = await getSession({ req }) as any
    const {about, handle} = req.body
    const updatedInfo = {about, handle}
    if (updatedInfo.about.length > 300) updatedInfo.about = about.slice(0, 300)
    if (handle?.length == 0) delete updatedInfo.handle 
    //@ts-expect-error
    await User.findOneAndUpdate({_id: new ObjectId(currentUserID)}, updatedInfo)
    return res.status(200).send('ok')
  }

  return res.status(400).end()
}

