import Post from '../data/Posts'
import {ObjectId***REMOVED*** from 'mongodb'

export default async function (postIDs = [], userID = null) {
  postIDs = Array.isArray(postIDs)
    ? postIDs.map(i => new ObjectId(i))
    : [new ObjectId(postIDs)]


  userID = userID && new ObjectId(userID)



  const posts = await Post.aggregate([
    ((userID && postIDs.length == 0)
    ? {$match: {createdBy: userID***REMOVED******REMOVED***
    : {$match: {$expr:{$in: ['$_id', postIDs]***REMOVED******REMOVED******REMOVED***),
    {$lookup: {
      from: 'posts',
      as: 'isReposted',
      let: {postID: '$_id'***REMOVED***,
      pipeline: [
        {$match: { $expr: { $eq: ["$$postID", "$$ROOT.quotes"] ***REMOVED*** ***REMOVED******REMOVED***
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
    {$sort: {createdAt: -1***REMOVED******REMOVED***
    // {$set: {replyTo: {$toObjectId: "$replyTo"***REMOVED*** ***REMOVED******REMOVED***,
    // {$lookup: {
      // from: 'posts',
      // as: 'replyTo',
      // let: {findID: '$replyTo'***REMOVED***,
      // pipeline: [
        // {$match: {$expr: {$eq:['$_id', '$$findID']***REMOVED******REMOVED******REMOVED***,
        // {$project: {createdBy: 1***REMOVED******REMOVED***,
        // {$lookup: {
    //       from: 'users',
    //       as: 'createdBy',
    //       let: {userID: '$createdBy'***REMOVED***,
    //       pipeline: [
    //         {$match: {$expr: {$eq: ['$_id', '$$userID']***REMOVED******REMOVED******REMOVED***,
    //         {$project: {handle: 1***REMOVED******REMOVED***
    //       ]
    //   ***REMOVED******REMOVED***,
    //     {$set: {createdBy: {$arrayElemAt:['$createdBy', 0]***REMOVED******REMOVED******REMOVED***
    //   ]
    // ***REMOVED******REMOVED***,
    // {$set: {replyTo: {$ifNull: [{$arrayElemAt:['$replyTo', 0]***REMOVED***, null]***REMOVED******REMOVED******REMOVED***
  ])


  return posts.length == 1 ? posts[0] : posts

***REMOVED***
