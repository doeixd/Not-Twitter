import { getTrendsFromTwitter ***REMOVED*** from '../../lib/getTrendsFromTwitter'

export default async function handler(_,res) {
  try {
    const trends = await getTrendsFromTwitter()
    return res.json({trends***REMOVED***)
***REMOVED*** catch {
    res.status(400).send()
***REMOVED***
***REMOVED***
