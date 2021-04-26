
import User from '../../../data/Users'
import { ObjectId ***REMOVED*** from 'mongodb'
import { getSession ***REMOVED*** from 'next-auth/client'

export default async function handler(req, res) {

  if (req.method == 'PUT') {
    const { user: { id: currentUserID ***REMOVED*** ***REMOVED*** = await getSession({ req ***REMOVED***) as any
    const {about, handle***REMOVED*** = req.body
    const updatedInfo = {about, handle***REMOVED***
    if (updatedInfo.about.length > 300) updatedInfo.about = about.slice(0, 300)
    if (handle?.length == 0) delete updatedInfo.handle 
    //@ts-expect-error
    await User.findOneAndUpdate({_id: new ObjectId(currentUserID)***REMOVED***, updatedInfo)
    return res.status(200).send('ok')
***REMOVED***

  return res.status(400).end()
***REMOVED***

