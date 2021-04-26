import mongoose from 'mongoose';
import { ObjectId } from 'mongodb'
import Post from'./Posts'

mongoose.connect(process.env.DATABASE_URL, {useFindAndModify: false});

const userSchema = new mongoose.Schema({
  handle: String,
  name: String,
  role: {type: String, default: 'user'},
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  followerCount: {type: Number, default:0},
  following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  followingCount:{type: Number, default:0},
  image: String,
  about: String,
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  notifications: [{action:String, actorID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, objectID: {type:mongoose.Schema.Types.ObjectId}  }],
  lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  isPrivate: {type: Boolean, default: false},
  feed: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  feedLastUpdated: {type: Date, default: Date.now},
})

// [{action:String, actorID, {type: mongoose.Schema.Types.ObjectId, ref: 'User'} objectID: {type:mongoose.Schema.Types.ObjectId},  }]


userSchema.index({name: 'text', handle: 'text', about: 'text'});
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
/* } */

export default mongoose.models.User || mongoose.model('User', userSchema)

