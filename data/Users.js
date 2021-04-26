import mongoose from 'mongoose';
import { ObjectId ***REMOVED*** from 'mongodb'
import Post from'./Posts'

mongoose.connect(process.env.DATABASE_URL, {useFindAndModify: false***REMOVED***);

const userSchema = new mongoose.Schema({
  handle: String,
  name: String,
  role: {type: String, default: 'user'***REMOVED***,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'***REMOVED***],
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'***REMOVED***],
  followerCount: {type: Number, default:0***REMOVED***,
  following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'***REMOVED***],
  followingCount:{type: Number, default:0***REMOVED***,
  image: String,
  about: String,
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'***REMOVED***],
  notifications: [{action:String, actorID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'***REMOVED***, objectID: {type:mongoose.Schema.Types.ObjectId***REMOVED******REMOVED***],
  lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'***REMOVED***],
  isPrivate: {type: Boolean, default: false***REMOVED***,
  feed: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'***REMOVED***],
  feedLastUpdated: {type: Date, default: Date.now***REMOVED***,
***REMOVED***)

// [{action:String, actorID, {type: mongoose.Schema.Types.ObjectId, ref: 'User'***REMOVED*** objectID: {type:mongoose.Schema.Types.ObjectId***REMOVED***,***REMOVED***]


userSchema.index({name: 'text', handle: 'text', about: 'text'***REMOVED***);
/* type Role = 'user' | 'admin' */

/* export interface Users { */
/*   username: string, */
/*   role: Role, */
/*   email: string, */
/*   password: string, */
/*   joinedAt: Date, */
/*   posts: number[], */
/*   followers: number[], */
/*   following: number[], */
/*   profilePic: string, */
/*   likes: number[] */
/*   notifications: string[], */
/*   lists: number[] */
/* ***REMOVED*** */

export default mongoose.models.User || mongoose.model('User', userSchema)

