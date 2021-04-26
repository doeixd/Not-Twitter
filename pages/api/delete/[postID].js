import Post from '../../../data/Posts'
import User from '../../../data/Users'
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  // if (req.method != 'DELETE') return res.status(400).end()
  
  try {
    let { user: { id: currentUserID } } = await getSession({ req }) 
    let { query: { postID }} = req

    const currentUser = await User.findByIdAndUpdate(new ObjectId(currentUserID), {$pull: {posts: new ObjectId(postID)}}) 
    const post = await Post.findByIdAndDelete(new ObjectId(postID))
    // todo: remove the post from replies arrays
    return res.status(200).send()
  } catch (error) {
    console.log({error})
    return res.status(400).end()
  }

}