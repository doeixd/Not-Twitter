import Post from '../data/Posts'
import {ObjectId***REMOVED*** from 'mongodb'

export default async function (postIDs, userID) {

  // console.log({postIDs***REMOVED***);
  if(!postIDs) return []
  postIDs = Array.isArray(postIDs)
    ? postIDs.map(i => new ObjectId(i))
    : [new ObjectId(postIDs)]

  // console.log({postIDs***REMOVED***);
  userID = new ObjectId(userID)

  const initialLoad = await Users.aggregate([
    { $match: { _id: userID ***REMOVED*** ***REMOVED***,
    {
      $lookup: {
        from: "posts",
        as: "feed",
        let: { feed: "$feed" ***REMOVED***,
        pipeline: [
          { $match: { $expr: { $in: ["$_id", postIDs] ***REMOVED*** ***REMOVED*** ***REMOVED***,
          {
            $lookup: {
              from: "posts",
              as: "isReposted",
              let: { postID: "$_id" ***REMOVED***,
              pipeline: [{ $match: { quotes: "$_id", createdBy: userID ***REMOVED*** ***REMOVED***],
          ***REMOVED***,
        ***REMOVED***,
          { $set: { isReposted: { $anyElementTrue: ["$isReposted"] ***REMOVED*** ***REMOVED*** ***REMOVED***,
          {
            $lookup: {
              from: "users",
              as: "isLiked",
              let: { postID: "$_id" ***REMOVED***,
              pipeline: [
                { $match: { _id: userID ***REMOVED*** ***REMOVED***,
                { $match: { $expr: { $in: ["$$postID", "$$ROOT.likes"] ***REMOVED*** ***REMOVED*** ***REMOVED***,
              ],
          ***REMOVED***,
        ***REMOVED***,
          { $set: { isLiked: { $anyElementTrue: ["$isLiked"] ***REMOVED*** ***REMOVED*** ***REMOVED***,
        ],
    ***REMOVED***,
  ***REMOVED***,
  ])


  const posts = await Post.aggregate([
    {$match: {$expr:{$in: ['$_id', postIDs]***REMOVED******REMOVED******REMOVED***,
    {$lookup: {
      from: 'posts',
      as: 'isReposted',
      let: {postID: '$_id'***REMOVED***,
      pipeline: [
       {$match:{quotes: '$_id', createdBy: userID***REMOVED******REMOVED***,
      ]
  ***REMOVED******REMOVED***,
    {$set: {isReposted: {$anyElementTrue:['$isReposted']***REMOVED******REMOVED******REMOVED***,
    {$lookup: {
      from: 'users',
      as: 'isLiked',
      let: {postID: '$_id'***REMOVED***,
      pipeline: [
       {$match:{_id: userID,***REMOVED******REMOVED***,
       {$match:{$expr: {$in: ['$$postID', '$$ROOT.likes']***REMOVED******REMOVED******REMOVED***
      ]
  ***REMOVED******REMOVED***,
    {$set: {isLiked: {$anyElementTrue:['$isLiked']***REMOVED******REMOVED******REMOVED***,
    {$lookup: {
      from: 'users',
      as: 'createdUser',
      let: { user: '$createdBy'***REMOVED***,
      pipeline: [
        {$match: {_id: '$$user'***REMOVED******REMOVED***,
        {$project: {id:1, about:1, name:1, handle:1, followerCount:1, followingCount:1, image:1, createdAt:1,***REMOVED******REMOVED***
      ]
  ***REMOVED******REMOVED***,
    {$group: {
      users: {$addToSet: '$createdUser'***REMOVED***,
      posts: {$addToSet: {$project: {createdUser: 0***REMOVED******REMOVED***
  ***REMOVED******REMOVED******REMOVED***
  ])

  // console.log({posts***REMOVED***);
  return posts.length == 1 ? posts[0] : posts

***REMOVED***
