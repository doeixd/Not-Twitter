import { getTrendsFromTwitter } from '../../lib/getTrendsFromTwitter'

export default async function handler(_,res) {
  try {
    const trends = await getTrendsFromTwitter()
    return res.json({trends})
  } catch {
    res.status(400).send()
  }
}
