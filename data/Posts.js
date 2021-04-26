import mongoose from 'mongoose';

// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.DATABASE_URL, {useFindAndModify: false});

const postSchema = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  content: String,
  likes: {type: Number, default: 0},
  replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  replyCount: {type: Number, default: 0},
  quotes: {type: mongoose.Schema.Types.ObjectId, ref:'Post'},
  quoteCount: {type: Number, default: 0},
  replyTo: {type: mongoose.Schema.Types.ObjectId, ref:'Post'},
  replyToHandle: String,
  createdAt: {type: Date, default: () => new Date()},
  tags: [String],
  mentions: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

})

postSchema.index({content: 'text', createdBy: 'text', tags: 'text'});


export default mongoose.models.Post || mongoose.model('Post', postSchema)

