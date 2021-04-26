import { ObjectId } from "mongodb";
import Posts from "../data/Posts";
import Users from "../data/Users";

export default async function deletePost (postID){
  postID = new ObjectId(postID)

  const posts = await Posts.aggregate([
    {$match: {$expr: {$ne: ['$_id', postID]}}},
    {$set: {
      replies: {$filter: {input: '$replies', as: 'reply', cond: {$ne: ['$$reply', postID]}}}
    }},
    {$out: {db: 'db1', coll: 'posts' }}

  ]) 
  console.log({posts})
  const users = await Users.aggregate([
    {$set: {
      likes: {$filter: {input: '$likes', as: 'likedPost', cond: {$ne: ['$$likedPost', postID]}}},
      replies: {$filter: {input: '$replies', as: 'reply', cond: {$ne: ['$$reply', postID]}}},
      feed: {$filter: {input: '$feed', as: 'feedItem', cond: {$ne: ['$$feedItem', postID]}}}
    }},
    {$out: {db: 'db1', coll: 'users'}}

  ])
  console.log({users})
}