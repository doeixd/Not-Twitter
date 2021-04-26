import nlp from 'compromise'
import Posts from '../data/Posts'
import { Map ***REMOVED*** from "immutable";


class List {
  constructor(initial) {
    this.data = initial?.concat(new Array(10 - initial.length)).fill(null, initial.length, 9) ?? new Array(10).fill(null)
    Reflect.preventExtensions(this)
***REMOVED***

  get(key) {return this.data[key-1]***REMOVED***
  set(key, value) {
    this.data[key-1] = value
    return new List(this.data)
***REMOVED***

  push (value) {
    const draft = new List()
    for (let i = 9; i >= 0; i--) {
      draft.data[i] = this.data[i -1]
  ***REMOVED***
    draft.data[0] = value
    return draft
***REMOVED***

  *[Symbol.iterator]() {
    for (let i =0; i<10; i++){
      console.log(i)
      if(this.data[i]) yield this.data[i]
  ***REMOVED***
***REMOVED***

  get score() {
    let score = 0
    for (let i of this) {
      score += i
  ***REMOVED***
    return score
***REMOVED***
***REMOVED***

export async function updateTrends() {
  const isFirstRun = !!!process.env?.trends

  const trends = isFirstRun ? new Map() : process.env.trends
  // If updated less than 5 min ago, timeSince is false. If updated more than 48 hours ago, just round down to 48hrs ago. If updated between the two just return lastUpdated
  let timeSince =
    isFirstRun
      ? new Date(0)
      : process.env.trendsLastUpdated > 600000
        ? new Date() - process.env.trendsLastUpdated > 172800000
          ? new Date() - 172800000
          : process.env.trendsLastUpdated
        : false

  if (!timeSince) return process.env.trends
  timeSince = Date.parse(timeSince)

  let newPosts = await Posts.find({createdAt:{$gt: timeSince***REMOVED******REMOVED***).sort('-createdAt')
  // const latestPost = Date.parse(newPosts[0].createdAt)
  const now = Date.now() + 10000
  const timeSpan = (now - timeSince)
  const subDivision = Math.floor(timeSpan / 5)

  newPosts = newPosts.reduce((acc, post)=>{
    const timeBucket = Math.abs(Math.floor((Date.parse(post.createdAt) - timeSince)  / (subDivision)) -4)
    acc[timeBucket].push(post)
    return acc
***REMOVED***,[[],[],[],[],[]] )


  // console.log(JSON.stringify({newPosts***REMOVED***,null,2))

  return {***REMOVED***
***REMOVED***


