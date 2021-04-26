import User from '../../../data/Users'
import Post from '../../../data/Posts'
import { extractCurrentUser ***REMOVED*** from '../../../lib/extractCurrentUser'
import { notify ***REMOVED*** from '../../../lib/notify';
import { ObjectId ***REMOVED*** from 'mongodb'

export default async function handler(req, res) {
  if (req.method != 'POST') return res.status(400).end()

  try {
    const currentUser = await extractCurrentUser(req)
    const post = await createPost(req?.body, currentUser)
    await dispatchNotifications(post)
    return res.status(200).end()
***REMOVED***

  catch(err) {
    console.log(err)
    return res.status(400).end()
***REMOVED***

***REMOVED***


async function createPost (draft, currentUser) {
  draft.createdBy = currentUser._id
  const post = new Post(draft)

  currentUser.posts.push(post._id)
  await currentUser.save()

  const extractedUniqueTags = new Array(...new Set(post?.content?.match(/(?<=#)\w+/g) ?? []))
  post.tags = extractedUniqueTags 

  const extractedHandles = post?.content?.match(/(?<=@)\w+/g) ?? []
  const mentionedUserIDs = await (await User.find({handle: {$in: extractedHandles***REMOVED******REMOVED***, '_id')).map(m => m?._id)
  post.mentions = mentionedUserIDs 

  if (post?.replyTo) 
    await Post.findByIdAndUpdate(post.replyTo, {$inc: {replyCount: 1***REMOVED***, $push: {replies: new ObjectId(post._id)***REMOVED******REMOVED***)

  if (post?.quotes)
    await Post.findByIdAndUpdate(post.quotes, { $inc: { quoteCount: 1 ***REMOVED***, ***REMOVED***)

  await post.save()
  return post
***REMOVED***


async function dispatchNotifications (post) {
  const actorID = post.createdBy
  const objectID = post._id
  const defaults = {actorID, objectID***REMOVED***

  if(post?.mentions?.length) 
    post.mentions.forEach(async (user) => {
      await notify({...defaults, action: 'mention', receiverID: user ***REMOVED***)
  ***REMOVED***)

  if(post?.replyTo)
    await notify({...defaults, action: 'reply'***REMOVED***)

  
  if(post?.quotes)
    await notify({...defaults, action: 'quote'***REMOVED***)
***REMOVED***

