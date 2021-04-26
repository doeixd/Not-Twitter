
import puppeteer from 'puppeteer'


export async function getTrendsFromTwitter() {
  try {
    const isStale = Math.abs(new Date() - (process?.env?.timeTwitterTrendsLastUpdated ?? 0)) < 600000
    if (!isStale && process?.env?.cachedTwitterTrends) return JSON.parse(process?.env?.cachedTwitterTrends)

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://twitter.com/explore');
    await page.waitForSelector('[data-testid="trend"] > div');

    let trends = await page.$$eval('[data-testid="trend"] > div', trends => {
      return trends.map(trend => {
        const [category, name, engagement = null] = Array.from(trend.querySelectorAll('div > div > span')).map(i => i.innerText)
        return {
          category, name, engagement: engagement && engagement.replace('Tweets', 'Posts')
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***)

    await browser.close();

    process.env.timeTwitterTrendsLastUpdated = new Date()
    process.env.cachedTwitterTrends = JSON.stringify(trends, null, 2)

    return trends
***REMOVED***
  catch (error) {
    console.error('Unable to update twitter trends', error)
    return null
***REMOVED***
***REMOVED***
