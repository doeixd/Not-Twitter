import axios from 'axios'
import WritePost from '../components/WritePost'
import Feed from '../components/Feed'
import { QueryClient, useQuery } from "react-query"
import { dehydrate } from "react-query/hydration"
import { getSession } from 'next-auth/client'
import hydrateFeed from '../lib/hydrateFeed'
import useWindowSize from '../lib/useWindowSize'
import { useStore } from '../lib/store'
import PostButton from '../components/PostButton'
import { getTrendsFromTwitter } from '../lib/getTrendsFromTwitter'
import { updateTrends } from '../lib/updateTrends'
// import User from '../data/Users'
// import getPosts from '../lib/getPosts'
// import Users from '../data/Users'

export default function IndexPage(props) {
  // if (isLoading) return 'Loading'
  const {width: screenWidth} = useWindowSize()
  const image = useStore(state => state.image)
  const { set } = useStore()
  
  set(state => {state.lastPage = '/'})

  if (screenWidth < 812) {
    return (
      <>
        <div class='inline-flex items-center'>
          <span class='w-14'>
            <img class='mx-auto rounded-full w-8' src={image} />
          </span>
          <h1 class='py-3 pl-0.5 font-black text-lg'>Home</h1>
        </div>
        <Feed />
      </>
    )
  }


  return (
    <>
      <h1 class='p-3 font-black text-xl'>Home</h1>
      <WritePost />
      <div class="h-3 bg-gray-100"></div>
      <Feed />
    </>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()
  const session = await getSession(ctx)

  if (!session?.user?.id) return {props:{}}


  const {feed, users} = Object.assign({feed:[], users:[]}, await hydrateFeed(session.user.id))
  // console.log({feed: await hydrateFeed(session.user.id)})

  let justIDs = []

  feed.forEach(
    async (post) => {
      post = JSON.parse(JSON.stringify(post))
      justIDs.push(post._id)
      queryClient.setQueryData(['post', post._id], post )
    }
  )

  queryClient.setQueryData('feed', justIDs)

  users.forEach(
    async (user) => {
      user = JSON.parse(JSON.stringify(user))
      queryClient.setQueryData(['user', user._id], user)
    }
  )
  const trends = await getTrendsFromTwitter()
  queryClient.setQueryData('trends', trends)

  const realTrends = await updateTrends()
  queryClient.setQueryData('realTrends', realTrends)


  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}

