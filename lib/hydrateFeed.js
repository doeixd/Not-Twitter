import User from '../data/Users';
import { ObjectId, ISODate } from 'mongodb'

export default async function updateFeed (userID, hydrate = false) {

  try {
    userID = new ObjectId(userID)
    let need = await User.aggregate(feedUpdater(userID))
    return need[0]

  } catch (err) {
    console.log(err)
    return err
  }


}
var feedUpdater = userID => [
  // Get current user
  { $match: { _id: userID } },

  // Lookup everyone the current user follows
  {
    $lookup: {
      from: "users",
      as: "allPosts",
      let: {
        lastUpdated: "$feedLastUpdated",
        userLikes: "$likes",
        initialPosts: "$posts",
        userFollows: "$following",
        curUserID: "$_id",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: [
                "$_id",
                { $concatArrays: ["$$userFollows", ["$$curUserID"]] },
              ],
            },
          },
        },
        // Get all the posts that have been posted since the current user last checked.
        {
          $lookup: {
            from: "posts",
            as: "userPosts",
            let: { userID: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $gt: ["$createdAt", "$$lastUpdated"] },
                      { $eq: ["$createdBy", "$$userID"] },
                    ],
                  },
                },
              },
            ],
          },
        },
        // {$project: }
        // Combine all new posts from followed users
        { $unwind: "$userPosts" },
        { $group: { _id: "$userPosts._id", doc: { $first: "$userPosts" } } },
        { $replaceRoot: { newRoot: "$doc" } },
        { $sort: { createdAt: -1 } },
        { $project: { _id: 1 } },
      ],
    },
  },
  // Update the current user's feed with all the new posts
  {
    $set: {
      feed: {
        $concatArrays: [
          { $ifNull: ["$allPosts", []] },
          { $ifNull: ["$feed", []] },
        ],
      },
      feedLastUpdated: `$$NOW`,
    },
  },
  // // Only return the *feed* field, filled with only ObjectId's
  {
    $project: {
      allPosts: "$$REMOVE",
      feedLastUpdated: 1,
      feed: {
        $reduce: {
          input: "$feed",
          initialValue: [],
          in: {
            $concatArrays: ["$$value", [{ $ifNull: ["$$this._id", "$$this"] }]],
          },
        },
      },
    },
  },
  {
    $lookup: {
      from: "posts",
      as: "feed",
      let: { feed: "$feed" },
      pipeline: [
        { $match: { $expr: { $in: ["$_id", "$$feed"] } } },
        { $lookup: {
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
        {$sort: {createdAt: -1}}
      ],
    },
  },
  {
    $lookup: {
      from: "users",
      as: "users",
      let: {feed: '$feed'},
      pipeline: [
        { $match: { $expr: { $in: ["$_id", {$ifNull: ["$$feed.createdBy", []]}] } }},
        {$project: {id:1, about:1, name:1, handle:1, followerCount:1, followingCount:1, image:1, createdAt:1,}}
      ],
    },
  },
  // Save current user's updated feed
  // { $merge: { into: "users", on: "_id" } },
]
