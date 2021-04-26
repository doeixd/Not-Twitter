import { ObjectId ***REMOVED*** from 'mongodb'
import { getSession ***REMOVED*** from 'next-auth/client'
import User from '../../../../data/Users'
import Post from '../../../../data/Posts'
import getPosts from '../../../../lib/getPosts'

export default async function handler(req, res) {
  
  if(req.method !== 'GET') return res.status(400).end()
    
  try { 
    const userID = req.query?.userID

    const posts = await getPosts([],userID)
    return res.status(200).json(posts)
***REMOVED*** 
  
  catch (err) {
    res.status(400).end()
***REMOVED***

***REMOVED***
