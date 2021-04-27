import User from '../../../data/Users'
import Post from '../../../data/Posts'
import { extractCurrentUser } from '../../../lib/extractCurrentUser'
import { notify } from '../../../lib/notify';
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  if (req.method != 'POST') return res.status(400).end()

  try {
    const currentUser = await extractCurrentUser(req)
    const post = await createPost(req?.body, currentUser)
    await dispatchNotifications(post)
    return res.json(post)
  }

  catch(err) {
    console.log(err)
    return res.status(400).end()
  }

}


async function createPost (draft, currentUser) {
  draft.createdBy = currentUser._id
  const post = new Post(draft)

  currentUser.posts.push(post._id)
  await currentUser.save()

  const extractedUniqueTags = new Array(...new Set(post?.content?.match(/(?<=#)\w+/g) ?? []))
  post.tags = extractedUniqueTags 

  const extractedHandles = post?.content?.match(/(?<=@)\w+/g) ?? []
  const mentionedUserIDs = await (await User.find({handle: {$in: extractedHandles}}, '_id')).map(m => m?._id)
  post.mentions = mentionedUserIDs 

  if (post?.replyTo) 
    await Post.findByIdAndUpdate(post.replyTo, {$inc: {replyCount: 1}, $push: {replies: new ObjectId(post._id)}})

  if (post?.quotes)
    await Post.findByIdAndUpdate(post.quotes, { $inc: { quoteCount: 1 }, })

  await post.save()
  return post
}


async function dispatchNotifications (post) {
  const actorID = post.createdBy
  const objectID = post._id
  const defaults = {actorID, objectID}

  if(post?.mentions?.length) 
    post.mentions.forEach(async (user) => {
      await notify({...defaults, action: 'mention', receiverID: user })
    })

  if(post?.replyTo)
    await notify({...defaults, action: 'reply'})

  
  if(post?.quotes)
    await notify({...defaults, action: 'quote'})
}

