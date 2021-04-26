import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import randomAdj from '../../../lib/adjective'
import Users from '../../../data/Users'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
  ***REMOVED***),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
  ***REMOVED***),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
  ***REMOVED***),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  // database: 'mongodb://patrickg:YGQx57mp2ulx3Kxy@cluster0.tzrto.mongodb.net/db1?retryWrites=true&w=majority'
  // database: process.env.DATABASE_URL,
 database: {
   type: 'mongodb',
   useNewUrlParser: true,
   useUnifiedTopology: true,
   url: 'mongodb://localhost/db1',
   // url: 'mongodb+srv://patrickg:YGQx57mp2ulx3Kxy@cluster0.tzrto.mongodb.net/db1?retryWrites=true&w=majority',
   w: 'majority',
   retryWrites: true,
   synchronize: true,
   // ssl: true,
   authSource: 'admin'
***REMOVED***,

 callbacks: {
    async signIn (user, account, profile) {
      await Users.findByIdAndUpdate(user.id, {image: user?.image***REMOVED***)

  ***REMOVED***,
    async session(session, user) {
      user = await Users.findById(user.id)
      const sessionUser = {
        ...session.user,
        id: user.id,
        username: user.username,
        role: user.role,
        image: user.image,
        name: user.name,
        handle: user.handle,
        following: user?.following,
    ***REMOVED***;

      return Promise.resolve({
        ...session,
        user: sessionUser,
    ***REMOVED***);
  ***REMOVED***,
***REMOVED***,
  events: {
   createUser: async (message) => {
     const user = await Users.findById(message.id)
     const handle = `${(user.name).split(' ').join('')***REMOVED***The${await randomAdj()***REMOVED***`
     user.handle = handle
     await user.save()
 ***REMOVED***,
***REMOVED***
***REMOVED***;


export default (req, res) => NextAuth(req, res, options)
