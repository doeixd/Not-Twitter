import Post from '../../../data/Posts'
import User from '../../../data/Users'
import { getSession ***REMOVED*** from 'next-auth/client'
import { ObjectId ***REMOVED*** from 'mongodb'
import getPosts from '../../../lib/getPosts'
import deletePost from '../../../lib/deletePost'

export default async function handler(req, res) {

  const session = await getSession({ req ***REMOVED***) as any
  const { query: { postIDs ***REMOVED******REMOVED*** = req

  const userID = session?.user?.id
  const user = await User.findById(userID)
  if (!user) return res.status(400).end()

  if (req.method == 'GET') {
    try {
      const posts = await getPosts(postIDs, userID)
      // console.log({posts***REMOVED***)
      return res.status(200).json(posts)
  ***REMOVED*** catch (err) {
      console.log(err)
      return res.status(400).end()
  ***REMOVED***
***REMOVED***

  if (req.method == 'DELETE' ) {
    try {
      await deletePost(postIDs)
      return res.status(200).send('ok')
  ***REMOVED*** catch (error) {
      console.log({error***REMOVED***)
      return res.status(400).end()
  ***REMOVED***
***REMOVED***
  return res.status(400).end()
***REMOVED***
