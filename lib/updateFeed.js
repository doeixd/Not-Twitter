import User from '../data/Users';
import { ObjectId, ISODate } from 'mongodb'

export default async function updateFeed (userID, hydrate = false) {
  
  try { 
    userID = new ObjectId(userID)
    let need = await User.aggregate(feedUpdater(userID))
    const { feed } = await User.findById(userID, 'feed')
    return feed

  } catch (err) {
    console.log(err)
    return err
  }


}
var feedUpdater = userID => [
  // Get current user
  { $match: { _id: userID } },
  
  // Lookup everyone the current user follows
  { $lookup: {
      from: "users",
      as: "allPosts",
      let: {
        lastUpdated: "$feedLastUpdated",
        userLikes: "$likes",
        initialPosts: "$posts",
        userFollows: "$following",
        curUserID: "$_id"
      },
      pipeline: [
        {$match: {$expr:{$in:['$_id', {$concatArrays: ['$$userFollows', ['$$curUserID'] ]} ] }}},
        // Get all the posts that have been posted since the current user last checked.
        { $lookup: {
            from: "posts",
            as: "userPosts",
            let: { userID: "$_id" },
            pipeline: [
              { $match: {
                  $expr: {
                    $and: [
                      { $gt: ["$createdAt", "$$lastUpdated"] },
                      { $eq: ["$createdBy", "$$userID"], },
                    ],
                  },
                },
              },
            ],
          },
        },
        // Combine all new posts from followed users
        { $unwind: "$userPosts" },
        { $group: { _id: "$userPosts._id", doc: { $first: "$userPosts" } } },
        { $replaceRoot: { newRoot: "$doc" } },
        { $sort: { createdAt: -1 } },
        { $project: { _id: 1 } },
      ],
    },
  },
  {$lookup: {
    from: 'posts',
    as: 'feed',
    let: {feed: '$feed'},
    pipeline: [
      {$match:{$expr: {$in:['$_id', '$$feed']}}},
      {$sort: { createdAt: -1 } },
      { $project: { _id: 1 } },
    ]
  }},
  // Update the current user's feed with all the new posts
  { $set: {
      feed: {
        $concatArrays: [
          { $ifNull: ["$allPosts", []] },
          { $ifNull: ["$feed", []] },
        ],
      },
      feedLastUpdated: '$$NOW',
    },
  },
  // Only return the *feed* field, filled with only ObjectId's
  { $project: {
      allPosts: "$$REMOVE",
      feedLastUpdated: 1,
      feed: {
        $reduce: {
          input: "$feed",
          initialValue: [],
          in: { $concatArrays: ["$$value", [{$ifNull:["$$this._id", "$$this"]}] ]},
        },
      },
    },
  },
  // Save current user's updated feed
  { $merge: { into: "users", on: "_id" } },
]
