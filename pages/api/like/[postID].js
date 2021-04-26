import Post from '../../../data/Posts'
import User from '../../../data/Users'
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'
import { notify } from '../../../lib/notify'
import { extractCurrentUser  } from "../../../lib/extractCurrentUser";
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).end()

  try {
    let { query: { postID }} = req
    const user = extractCurrentUser(req)
    await likePost(user, postID)
    notify({action:'like', actorID: user._id, objectID: postID })
    console.log({currentUser});

    return res.status(200).end()
  } catch (error) {
    console.log({error})
    return res.status(400).end()
  }

}


async function likePost(user, postID) {
   postID = new ObjectId(postID)
  const isLiked = user.likes.includes(postID)
  // if(!isLiked) notify({action: 'like', actorID: this._id, objectID: postID})
  const op = isLiked ? 'pull' : 'push'
  user.likes[op](postID)
  const postOP= {$inc: {likes : isLiked ? -1 : 1}}
  const liked = await Post.findByIdAndUpdate(postID, postOP)
  await user.save()
}