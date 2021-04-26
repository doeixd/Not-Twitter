import Post from '../../../data/Posts'
import User from '../../../data/Users'
import { ObjectId ***REMOVED*** from 'mongodb'
import { getSession ***REMOVED*** from 'next-auth/client'
import { notify ***REMOVED*** from '../../../lib/notify'
import { extractCurrentUser***REMOVED*** from "../../../lib/extractCurrentUser";
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).end()

  try {
    let { query: { postID ***REMOVED******REMOVED*** = req
    const user = extractCurrentUser(req)
    await likePost(user, postID)
    notify({action:'like', actorID: user._id, objectID: postID ***REMOVED***)
    console.log({currentUser***REMOVED***);

    return res.status(200).end()
***REMOVED*** catch (error) {
    console.log({error***REMOVED***)
    return res.status(400).end()
***REMOVED***

***REMOVED***


async function likePost(user, postID) {
   postID = new ObjectId(postID)
  const isLiked = user.likes.includes(postID)
  // if(!isLiked) notify({action: 'like', actorID: this._id, objectID: postID***REMOVED***)
  const op = isLiked ? 'pull' : 'push'
  user.likes[op](postID)
  const postOP= {$inc: {likes : isLiked ? -1 : 1***REMOVED******REMOVED***
  const liked = await Post.findByIdAndUpdate(postID, postOP)
  await user.save()
***REMOVED***