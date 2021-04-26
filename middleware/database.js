import { MongoClient ***REMOVED*** from 'mongodb';
import mongoose from 'mongoose';
import nextConnect from 'next-connect';

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true***REMOVED***);

const postSchema = new mongoose.Schema({
  content: String
***REMOVED***)

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

new Post({content: 'Whats up'***REMOVED***).save()

async function database(req, res, next) {
  // if (!client.isConnected()) await client.connect();
  req.Posts = Post
  return next();
***REMOVED***

const middleware = nextConnect();

middleware.use(database);

export default middleware;
