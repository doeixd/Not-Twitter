import Post from '../../../data/Posts'
import User from '../../../data/Users'
import { ObjectId ***REMOVED*** from 'mongodb'
import { getSession ***REMOVED*** from 'next-auth/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).end()

  try {
    let { user: { id: currentUserID ***REMOVED*** ***REMOVED*** = await getSession({ req ***REMOVED***)
    let { query: { postID ***REMOVED******REMOVED*** = req
    const isReposted = await Posts.find({createdBy: new ObjectId(currentUserID), quotes: new ObjectId(postID)***REMOVED***)
    console.log({isReposted***REMOVED***)
    if (!isReposted)
    const postOP= {$inc: { : isLiked ? -1 : 1***REMOVED******REMOVED***
    const post = await Post.findByIdAndUpdate(new ObjectId(postID), postOP)

    return res.status(200).send('good')
***REMOVED*** catch (error) {
    console.log({error***REMOVED***)
    return res.status(400).end()
***REMOVED***

***REMOVED***
