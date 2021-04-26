import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getUser, getPost, getPostsFromUser } from '../../lib/queryHooks'  
import { useRouter } from 'next/router'
import Post from '../../components/Post'
import { useStore } from "../../lib/store"
 // export async function getStaticProps() {
 //   const queryClient = new QueryClient()
 
 //   await queryClient.prefetchQuery('posts', getPosts)
 
 //   return {
 //     props: {
 //       dehydratedState: dehydrate(queryClient),
 //     },
 //   }
 // }

export default function ProfilePage() {
  const router = useRouter() 
  const {query: {postID} } = router

  const id = useStore(state => state.id)
  const lastPage = useStore(state => state.lastPage)

  const {isLoading, error, data} = getPost(postID)


  if (isLoading) return "Loading..."

  return (<>
      {/* <img src={data.image} /> */}
      {/* <div>{user?.name}</div>  */}
      <div class='flex items-center py-3 sm:py-2 pl-5 space-x-4 self-start sticky top-0 z-10 bg-white'>
        <span class='hover:bg-yellow-100 rounded-full p-1 transition-all content'>
          <svg onClick={()=> router.push(lastPage,undefined,{shallow:true})} viewBox="0 0 24 24" class="inline stroke-0 cursor-pointer w-8 text-yellow-500 fill-current"><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>
        </span>
        <h1 class='font-bold text-xl inline '>Post</h1>
      </div>
      {/* <div class='h-10'></div> */}
    <div>
      <Post id={postID} main={true} />
    </div>
    {
     data.replies.map(p => <Post key={p} id={p} />) 
    }

    </>
  )

}