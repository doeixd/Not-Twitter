import mongoose from 'mongoose';

// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true***REMOVED***);
mongoose.connect(process.env.DATABASE_URL, {useFindAndModify: false***REMOVED***);

const postSchema = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'***REMOVED***,
  content: String,
  likes: {type: Number, default: 0***REMOVED***,
  replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'***REMOVED***],
  replyCount: {type: Number, default: 0***REMOVED***,
  quotes: {type: mongoose.Schema.Types.ObjectId, ref:'Post'***REMOVED***,
  quoteCount: {type: Number, default: 0***REMOVED***,
  replyTo: {type: mongoose.Schema.Types.ObjectId, ref:'Post'***REMOVED***,
  replyToHandle: String,
  createdAt: {type: Date, default: () => new Date()***REMOVED***,
  tags: [String],
  mentions: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'***REMOVED***]

***REMOVED***)

postSchema.index({content: 'text', createdBy: 'text', tags: 'text'***REMOVED***);


export default mongoose.models.Post || mongoose.model('Post', postSchema)

