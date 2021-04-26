import Post from '../../../data/Posts'
import User from '../../../data/Users'
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).end()

  try {
    let { user: { id: currentUserID } } = await getSession({ req })
    let { query: { postID }} = req
    const isReposted = await Posts.find({createdBy: new ObjectId(currentUserID), quotes: new ObjectId(postID)})
    console.log({isReposted})
    if (!isReposted)
    const postOP= {$inc: { : isLiked ? -1 : 1}}
    const post = await Post.findByIdAndUpdate(new ObjectId(postID), postOP)

    return res.status(200).send('good')
  } catch (error) {
    console.log({error})
    return res.status(400).end()
  }

}
