import Post from '../../../data/Posts'
import User from '../../../data/Users'
import { ObjectId ***REMOVED*** from 'mongodb'
import { getSession ***REMOVED*** from 'next-auth/client'

export default async function handler(req, res) {
  // if (req.method != 'DELETE') return res.status(400).end()
  
  try {
    let { user: { id: currentUserID ***REMOVED*** ***REMOVED*** = await getSession({ req ***REMOVED***) 
    let { query: { postID ***REMOVED******REMOVED*** = req

    const currentUser = await User.findByIdAndUpdate(new ObjectId(currentUserID), {$pull: {posts: new ObjectId(postID)***REMOVED******REMOVED***) 
    const post = await Post.findByIdAndDelete(new ObjectId(postID))
    // todo: remove the post from replies arrays
    return res.status(200).send()
***REMOVED*** catch (error) {
    console.log({error***REMOVED***)
    return res.status(400).end()
***REMOVED***

***REMOVED***