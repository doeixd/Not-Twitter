import User from '../data/Users';
import { ObjectId, ISODate ***REMOVED*** from 'mongodb'

export default async function updateFeed (userID, hydrate = false) {

  try {
    userID = new ObjectId(userID)
    let need = await User.aggregate(feedUpdater(userID))
    return need[0]

***REMOVED*** catch (err) {
    console.log(err)
    return err
***REMOVED***


***REMOVED***
var feedUpdater = userID => [
  // Get current user
  { $match: { _id: userID ***REMOVED*** ***REMOVED***,

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
    ***REMOVED***,
      pipeline: [
        {
          $match: {
            $expr: {
              $in: [
                "$_id",
                { $concatArrays: ["$$userFollows", ["$$curUserID"]] ***REMOVED***,
              ],
          ***REMOVED***,
        ***REMOVED***,
      ***REMOVED***,
        // Get all the posts that have been posted since the current user last checked.
        {
          $lookup: {
            from: "posts",
            as: "userPosts",
            let: { userID: "$_id" ***REMOVED***,
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $gt: ["$createdAt", "$$lastUpdated"] ***REMOVED***,
                      { $eq: ["$createdBy", "$$userID"] ***REMOVED***,
                    ],
                ***REMOVED***,
              ***REMOVED***,
            ***REMOVED***,
            ],
        ***REMOVED***,
      ***REMOVED***,
        // {$project: ***REMOVED***
        // Combine all new posts from followed users
        { $unwind: "$userPosts" ***REMOVED***,
        { $group: { _id: "$userPosts._id", doc: { $first: "$userPosts" ***REMOVED*** ***REMOVED*** ***REMOVED***,
        { $replaceRoot: { newRoot: "$doc" ***REMOVED*** ***REMOVED***,
        { $sort: { createdAt: -1 ***REMOVED*** ***REMOVED***,
        { $project: { _id: 1 ***REMOVED*** ***REMOVED***,
      ],
  ***REMOVED***,
***REMOVED***,
  // Update the current user's feed with all the new posts
  {
    $set: {
      feed: {
        $concatArrays: [
          { $ifNull: ["$allPosts", []] ***REMOVED***,
          { $ifNull: ["$feed", []] ***REMOVED***,
        ],
    ***REMOVED***,
      feedLastUpdated: `$$NOW`,
  ***REMOVED***,
***REMOVED***,
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
            $concatArrays: ["$$value", [{ $ifNull: ["$$this._id", "$$this"] ***REMOVED***]],
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***,
  {
    $lookup: {
      from: "posts",
      as: "feed",
      let: { feed: "$feed" ***REMOVED***,
      pipeline: [
        { $match: { $expr: { $in: ["$_id", "$$feed"] ***REMOVED*** ***REMOVED*** ***REMOVED***,
        { $lookup: {
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
        {$sort: {createdAt: -1***REMOVED******REMOVED***
      ],
  ***REMOVED***,
***REMOVED***,
  {
    $lookup: {
      from: "users",
      as: "users",
      let: {feed: '$feed'***REMOVED***,
      pipeline: [
        { $match: { $expr: { $in: ["$_id", {$ifNull: ["$$feed.createdBy", []]***REMOVED***] ***REMOVED*** ***REMOVED******REMOVED***,
        {$project: {id:1, about:1, name:1, handle:1, followerCount:1, followingCount:1, image:1, createdAt:1,***REMOVED******REMOVED***
      ],
  ***REMOVED***,
***REMOVED***,
  // Save current user's updated feed
  // { $merge: { into: "users", on: "_id" ***REMOVED*** ***REMOVED***,
]
