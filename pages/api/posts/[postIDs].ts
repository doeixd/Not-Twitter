import Post from '../../../data/Posts'
import User from '../../../data/Users'
import { getSession } from 'next-auth/client'
import { ObjectId } from 'mongodb'
import getPosts from '../../../lib/getPosts'
import deletePost from '../../../lib/deletePost'

export default async function handler(req, res) {

  const session = await getSession({ req }) as any
  const { query: { postIDs }} = req

  const userID = session?.user?.id
  const user = await User.findById(userID)
  if (!user) return res.status(400).end()

  if (req.method == 'GET') {
    try {
      const posts = await getPosts(postIDs, userID)
      // console.log({posts})
      return res.status(200).json(posts)
    } catch (err) {
      console.log(err)
      return res.status(400).end()
    }
  }

  if (req.method == 'DELETE' ) {
    try {
      await deletePost(postIDs)
      return res.status(200).send('ok')
    } catch (error) {
      console.log({error})
      return res.status(400).end()
    }
  }
  return res.status(400).end()
}
