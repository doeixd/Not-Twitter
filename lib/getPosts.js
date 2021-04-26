import Post from '../data/Posts'
import {ObjectId} from 'mongodb'

export default async function (postIDs = [], userID = null) {
  postIDs = Array.isArray(postIDs)
    ? postIDs.map(i => new ObjectId(i))
    : [new ObjectId(postIDs)]


  userID = userID && new ObjectId(userID)



  const posts = await Post.aggregate([
    ((userID && postIDs.length == 0)
    ? {$match: {createdBy: userID}}
    : {$match: {$expr:{$in: ['$_id', postIDs]}}}),
    {$lookup: {
      from: 'posts',
      as: 'isReposted',
      let: {postID: '$_id'},
      pipeline: [
        {$match: { $expr: { $eq: ["$$postID", "$$ROOT.quotes"] } }}
      ]
    }},
    {$set: {isReposted: {$anyElementTrue:['$isReposted']}}},
    {$lookup: {
      from: 'users',
      as: 'isLiked',
      let: {postID: '$_id'},
      pipeline: [
       {$match:{_id: userID,}},
       {$match:{$expr: {$in: ['$$postID', '$$ROOT.likes']}}}
      ]
    }},
    {$set: {isLiked: {$anyElementTrue:['$isLiked']}}},
    {$sort: {createdAt: -1}}
    // {$set: {replyTo: {$toObjectId: "$replyTo"} }},
    // {$lookup: {
      // from: 'posts',
      // as: 'replyTo',
      // let: {findID: '$replyTo'},
      // pipeline: [
        // {$match: {$expr: {$eq:['$_id', '$$findID']}}},
        // {$project: {createdBy: 1}},
        // {$lookup: {
    //       from: 'users',
    //       as: 'createdBy',
    //       let: {userID: '$createdBy'},
    //       pipeline: [
    //         {$match: {$expr: {$eq: ['$_id', '$$userID']}}},
    //         {$project: {handle: 1}}
    //       ]
    //     }},
    //     {$set: {createdBy: {$arrayElemAt:['$createdBy', 0]}}}
    //   ]
    // }},
    // {$set: {replyTo: {$ifNull: [{$arrayElemAt:['$replyTo', 0]}, null]}}}
  ])


  return posts.length == 1 ? posts[0] : posts

}
