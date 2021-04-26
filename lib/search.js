import Posts from '../data/Posts'
import Users from '../data/Users'
import { getUser ***REMOVED*** from './getUser'

export async function search(query, currentUserId) {
  // query = new RegExp(query.split(' ').join('|'),'gi')
  console.log({query, currentUserId***REMOVED***);

  let posts = await Posts.aggregate([
    {$match: {
      $text: {
        $search: query
    ***REMOVED***
  ***REMOVED******REMOVED***,
    {$sort: {likes: -1, quoteCount: -1, replyCount: -1***REMOVED******REMOVED***,
    { $lookup: {
        from: 'users',
        let: {postID: '$_id'***REMOVED***,
        pipeline: [
          {$match: {$expr: {$eq: ["$_id", {"$toObjectId": currentUserId***REMOVED***]***REMOVED******REMOVED******REMOVED***,
          { $match: { $expr: { $in: ["$$postID", "$$ROOT.likes"] ***REMOVED*** ***REMOVED*** ***REMOVED***,
        ],
        as: 'isLiked'
    ***REMOVED******REMOVED***,
    { $set: { isLiked: { $anyElementTrue: ["$isLiked"] ***REMOVED*** ***REMOVED*** ***REMOVED***,
    // { $lookup: {
    //   from: "posts",
    //     as: "isReposted",
    //     let: { postID: "$_id" ***REMOVED***,
    //     pipeline: [{ $match: { quotes: "$_id", createdBy: {$toObjectId: currentUserId***REMOVED*** ***REMOVED*** ***REMOVED***],
    // ***REMOVED*** ***REMOVED***,
    // { $set: { isReposted: { $anyElementTrue: ["$isReposted"] ***REMOVED*** ***REMOVED*** ***REMOVED***,
  ])

  // console.log({posts***REMOVED***);

  let people = await Users.aggregate([
    {$match: {
      $text: {
        $search: query
    ***REMOVED***
  ***REMOVED******REMOVED***,
    {$sort: {followerCount: -1***REMOVED******REMOVED***,
    {$project: {id: 1, followerCount: 1, followingCount: 1, name: 1, handle:1, image:1, about:1, createdAt:1, likes:1***REMOVED******REMOVED***
  ])

  // console.log({people***REMOVED***);
  let users = posts.reduce(async (users, post) => {
    if(users?.[post.createdBy]) return users
    users[post.createdBy] = await getUser(post.createdBy, currentUserId)
    return users
***REMOVED***, {***REMOVED***)

  let cool = await Promise.all([posts, people, users])
  let result = {posts, users, people, cool***REMOVED***
  // console.log({result***REMOVED***)
  return result
***REMOVED***
