import Posts from '../data/Posts'
import Users from '../data/Users'
import { getUser } from './getUser'

export async function search(query, currentUserId) {
  // query = new RegExp(query.split(' ').join('|'),'gi')
  console.log({query, currentUserId});

  let posts = await Posts.aggregate([
    {$match: {
      $text: {
        $search: query
      }
    }},
    {$sort: {likes: -1, quoteCount: -1, replyCount: -1}},
    { $lookup: {
        from: 'users',
        let: {postID: '$_id'},
        pipeline: [
          {$match: {$expr: {$eq: ["$_id", {"$toObjectId": currentUserId}]}}},
          { $match: { $expr: { $in: ["$$postID", "$$ROOT.likes"] } } },
        ],
        as: 'isLiked'
      }},
    { $set: { isLiked: { $anyElementTrue: ["$isLiked"] } } },
    // { $lookup: {
    //   from: "posts",
    //     as: "isReposted",
    //     let: { postID: "$_id" },
    //     pipeline: [{ $match: { quotes: "$_id", createdBy: {$toObjectId: currentUserId} } }],
    // } },
    // { $set: { isReposted: { $anyElementTrue: ["$isReposted"] } } },
  ])

  // console.log({posts});

  let people = await Users.aggregate([
    {$match: {
      $text: {
        $search: query
      }
    }},
    {$sort: {followerCount: -1}},
    {$project: {id: 1, followerCount: 1, followingCount: 1, name: 1, handle:1, image:1, about:1, createdAt:1, likes:1}}
  ])

  // console.log({people});
  let users = posts.reduce(async (users, post) => {
    if(users?.[post.createdBy]) return users
    users[post.createdBy] = await getUser(post.createdBy, currentUserId)
    return users
  }, {})

  let cool = await Promise.all([posts, people, users])
  let result = {posts, users, people, cool}
  // console.log({result})
  return result
}
