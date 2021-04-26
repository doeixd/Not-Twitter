import Post from '../data/Posts'
import {ObjectId} from 'mongodb'

export default async function (postIDs, userID) {

  // console.log({postIDs});
  if(!postIDs) return []
  postIDs = Array.isArray(postIDs)
    ? postIDs.map(i => new ObjectId(i))
    : [new ObjectId(postIDs)]

  // console.log({postIDs});
  userID = new ObjectId(userID)

  const initialLoad = await Users.aggregate([
    { $match: { _id: userID } },
    {
      $lookup: {
        from: "posts",
        as: "feed",
        let: { feed: "$feed" },
        pipeline: [
          { $match: { $expr: { $in: ["$_id", postIDs] } } },
          {
            $lookup: {
              from: "posts",
              as: "isReposted",
              let: { postID: "$_id" },
              pipeline: [{ $match: { quotes: "$_id", createdBy: userID } }],
            },
          },
          { $set: { isReposted: { $anyElementTrue: ["$isReposted"] } } },
          {
            $lookup: {
              from: "users",
              as: "isLiked",
              let: { postID: "$_id" },
              pipeline: [
                { $match: { _id: userID } },
                { $match: { $expr: { $in: ["$$postID", "$$ROOT.likes"] } } },
              ],
            },
          },
          { $set: { isLiked: { $anyElementTrue: ["$isLiked"] } } },
        ],
      },
    },
  ])


  const posts = await Post.aggregate([
    {$match: {$expr:{$in: ['$_id', postIDs]}}},
    {$lookup: {
      from: 'posts',
      as: 'isReposted',
      let: {postID: '$_id'},
      pipeline: [
       {$match:{quotes: '$_id', createdBy: userID}},
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
    {$lookup: {
      from: 'users',
      as: 'createdUser',
      let: { user: '$createdBy'},
      pipeline: [
        {$match: {_id: '$$user'}},
        {$project: {id:1, about:1, name:1, handle:1, followerCount:1, followingCount:1, image:1, createdAt:1,}}
      ]
    }},
    {$group: {
      users: {$addToSet: '$createdUser'},
      posts: {$addToSet: {$project: {createdUser: 0}}
    }}}
  ])

  // console.log({posts});
  return posts.length == 1 ? posts[0] : posts

}
