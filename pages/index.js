import axios from 'axios'
import WritePost from '../components/WritePost'
import Feed from '../components/Feed'
import { QueryClient, useQuery ***REMOVED*** from "react-query"
import { dehydrate ***REMOVED*** from "react-query/hydration"
import { getSession ***REMOVED*** from 'next-auth/client'
import hydrateFeed from '../lib/hydrateFeed'
import useWindowSize from '../lib/useWindowSize'
import { useStore ***REMOVED*** from '../lib/store'
import PostButton from '../components/PostButton'
import { getTrendsFromTwitter ***REMOVED*** from '../lib/getTrendsFromTwitter'
import { updateTrends ***REMOVED*** from '../lib/updateTrends'
// import User from '../data/Users'
// import getPosts from '../lib/getPosts'
// import Users from '../data/Users'

export default function IndexPage(props) {
  // if (isLoading) return 'Loading'
  const {width: screenWidth***REMOVED*** = useWindowSize()
  const image = useStore(state => state.image)

  if (screenWidth < 812) {
    return (
      <>
        <div class='inline-flex items-center'>
          <span class='w-14'>
            <img class='mx-auto rounded-full w-8' src={image***REMOVED*** />
          </span>
          <h1 class='py-3 pl-0.5 font-black text-lg'>Home</h1>
        </div>
        <Feed />
      </>
    )
***REMOVED***


  return (
    <>
      <h1 class='p-3 font-black text-xl'>Home</h1>
      <WritePost />
      <div class="h-3 bg-gray-100"></div>
      <Feed />
    </>
  )
***REMOVED***

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()
  const session = await getSession(ctx)

  if (!session?.user?.id) return {props:{***REMOVED******REMOVED***


  const {feed, users***REMOVED*** = Object.assign({feed:[], users:[]***REMOVED***, await hydrateFeed(session.user.id))
  // console.log({feed: await hydrateFeed(session.user.id)***REMOVED***)

  let justIDs = []

  feed.forEach(
    async (post) => {
      post = JSON.parse(JSON.stringify(post))
      justIDs.push(post._id)
      queryClient.setQueryData(['post', post._id], post )
  ***REMOVED***
  )

  queryClient.setQueryData('feed', justIDs)

  users.forEach(
    async (user) => {
      user = JSON.parse(JSON.stringify(user))
      queryClient.setQueryData(['user', user._id], user)
  ***REMOVED***
  )
  const trends = await getTrendsFromTwitter()
  queryClient.setQueryData('trends', trends)

  const realTrends = await updateTrends()
  queryClient.setQueryData('realTrends', realTrends)


  return {
    props: {
      dehydratedState: dehydrate(queryClient),
  ***REMOVED***
***REMOVED***
***REMOVED***

