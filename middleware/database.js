import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import nextConnect from 'next-connect';

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
  content: String
})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

new Post({content: 'Whats up'}).save()

async function database(req, res, next) {
  // if (!client.isConnected()) await client.connect();
  req.Posts = Post
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
