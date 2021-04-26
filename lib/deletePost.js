import { ObjectId ***REMOVED*** from "mongodb";
import Posts from "../data/Posts";
import Users from "../data/Users";

export default async function deletePost (postID){
  postID = new ObjectId(postID)

  const posts = await Posts.aggregate([
    {$match: {$expr: {$ne: ['$_id', postID]***REMOVED******REMOVED******REMOVED***,
    {$set: {
      replies: {$filter: {input: '$replies', as: 'reply', cond: {$ne: ['$$reply', postID]***REMOVED******REMOVED******REMOVED***
  ***REMOVED******REMOVED***,
    {$out: {db: 'db1', coll: 'posts' ***REMOVED******REMOVED***

  ]) 
  console.log({posts***REMOVED***)
  const users = await Users.aggregate([
    {$set: {
      likes: {$filter: {input: '$likes', as: 'likedPost', cond: {$ne: ['$$likedPost', postID]***REMOVED******REMOVED******REMOVED***,
      replies: {$filter: {input: '$replies', as: 'reply', cond: {$ne: ['$$reply', postID]***REMOVED******REMOVED******REMOVED***,
      feed: {$filter: {input: '$feed', as: 'feedItem', cond: {$ne: ['$$feedItem', postID]***REMOVED******REMOVED******REMOVED***
  ***REMOVED******REMOVED***,
    {$out: {db: 'db1', coll: 'users'***REMOVED******REMOVED***

  ])
  console.log({users***REMOVED***)
***REMOVED***