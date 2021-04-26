import User from '../../data/Users';
import Post from '../../data/Posts'
import updateFeed from '../../lib/updateFeed'
import { getSession ***REMOVED*** from 'next-auth/client'
import { ObjectId, ISODate ***REMOVED*** from 'mongodb'
import getPosts from '../../lib/getPosts'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(400).end()
  
  try {
    const session = await getSession({ req ***REMOVED***)
    var userID = session?.user?.id
    if (!userID) return res.status(400).end()

    const feed = await updateFeed(userID)
    
    // feed = feed.map(i => new ObjectId(i))

    return res.status(200).json(feed)

***REMOVED*** catch (err) {
    console.log(err)
    return res.status(400).end()
***REMOVED***
***REMOVED***
