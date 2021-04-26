import { getSession } from "next-auth/client"
import { ObjectId } from "mongodb"
import User from '../data/Users';

export async function extractCurrentUser(req) {
  const session = await getSession({ req })
  let userID = session?.user?.id
  if (!userID) throw new Error('No ID Found, Try Signing In') 
  userID = new ObjectId(userID)
  return await User.findById(userID)
}
