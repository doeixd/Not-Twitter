import { QueryClient, useQuery ***REMOVED*** from 'react-query'
import { dehydrate ***REMOVED*** from 'react-query/hydration'
import { getUser, getPost, getPostsFromUser ***REMOVED*** from '../lib/queryHooks'
import { useRouter ***REMOVED*** from 'next/router'
import Post from '../components/Post'
import { useStore ***REMOVED*** from "../lib/store"
import {useState***REMOVED*** from 'react'
 // export async function getStaticProps() {
 //   const queryClient = new QueryClient()

 //   await queryClient.prefetchQuery('posts', getPosts)

 //   return {
 //     props: {
 //       dehydratedState: dehydrate(queryClient),
 //   ***REMOVED***,
 // ***REMOVED***
 // ***REMOVED***

export default function ProfilePage() {
  const router = useRouter()
  const {query: {userID***REMOVED*** ***REMOVED*** = router

  const id = useStore(state => state.id)
  const set = useStore(state => state.set)
  const lastPage = useStore(state => state.lastPage)
  // const activeTab = useStore(state => state.activeTab)

  const [activeTab, setActiveTab] = useState('Posts')

  const {isLoading: isUserLoading, error: userError, data: userData***REMOVED*** = getUser(userID)
  const {isLoading: isPostLoading, error: postError, data: postData***REMOVED*** = getPostsFromUser(userID)

  if (isPostLoading || isUserLoading) return "Loading..."

  return (<>
      {/* <img src={data.image***REMOVED*** /> */***REMOVED***
      {/* <div>{user?.name***REMOVED***</div>  */***REMOVED***
      <div class='w-full flex items-center py-3 pl-5 space-x-4 self-start sticky top-0 z-10 bg-white'>
        <span class='hover:bg-yellow-100 rounded-full p-1 transition-all content'>
          <svg onClick={() => router.push(lastPage,undefined,{shallow:true***REMOVED***)***REMOVED*** viewBox="0 0 24 24" class="inline stroke-0 cursor-pointer w-8 text-yellow-500 fill-current"><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>
        </span>
        <h1 class='font-bold text-xl inline '>{userData?.name***REMOVED***</h1>
      </div>
      {/* <div class='h-10'></div> */***REMOVED***
    <div>
        <div class='relative'>
          <img src='https://thisartworkdoesnotexist.com/' class='w-full h-44' />
          <img src={userData?.image***REMOVED*** class='w-36 h-36 border-8 border-white rounded-full absolute top-24 box-content left-5' />
          <div class='min-w-full h-20 flex flex-row-reverse p-5'>
            <EditButton show={id == userID***REMOVED*** set={set***REMOVED*** />
          </div>
          <div class='px-4'>
            <div class='text-xl font-semibold'>{userData?.name***REMOVED***</div>
            <div class='text-gray-500 '>@{userData?.handle***REMOVED***</div>
            <p class='py-2'>{userData?.about***REMOVED***</p>
            <div class='text-gray-500 align-text-bottom'> <svg viewBox="0 0 24 24" class=" inline stroke-0 w-5 align-text-bottom fill-current"><g><path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path><circle cx="7.032" cy="8.75" r="1.285"></circle><circle cx="7.032" cy="13.156" r="1.285"></circle><circle cx="16.968" cy="8.75" r="1.285"></circle><circle cx="16.968" cy="13.156" r="1.285"></circle><circle cx="12" cy="8.75" r="1.285"></circle><circle cx="12" cy="13.156" r="1.285"></circle><circle cx="7.032" cy="17.486" r="1.285"></circle><circle cx="12" cy="17.486" r="1.285"></circle></g></svg> Joined {new Date(userData?.createdAt).toDateString()***REMOVED***</div>
            <div class='pt-4 space-x-5'>
              <span><span class='text-gray-900 font-bold'>{userData?.followerCount ?? 0***REMOVED***</span> <span class='text-gray-500'>Followers</span></span>
              <span><span class='text-gray-900 font-bold'>{userData?.followingCount ?? 0***REMOVED***</span> <span class='text-gray-500'>Following</span></span>
            </div>
          </div>
        <div class='flex flex-row text-center justify-evenly pt-8 border-b border-gray-200 '>
          <TabItem setActiveTab={setActiveTab***REMOVED*** activeTab={activeTab***REMOVED***>Posts</TabItem>
          <TabItem setActiveTab={setActiveTab***REMOVED*** activeTab={activeTab***REMOVED***>Replies</TabItem>
          <TabItem setActiveTab={setActiveTab***REMOVED*** activeTab={activeTab***REMOVED***>Likes</TabItem>
        </div>
      </div>
    </div>

    {(activeTab == 'Posts')
       && ((postData?.filter(post => !!!post?.replyTo)?.length > 0)
        ? postData
          ?.filter(post => !!!post?.replyTo)
          ?.map(({_id: p***REMOVED***) => <Post key={p***REMOVED*** id={p***REMOVED*** />)
        : <Placeholder content={activeTab***REMOVED***/>
       )
  ***REMOVED***

    {(activeTab == 'Replies')
      && ((postData?.filter(post => !!post?.replyTo).length > 0)
            ? postData
              ?.filter(post => !!post?.replyTo)
              ?.map((p,_,arr) =>
                <><Post key={p?.replyTo***REMOVED*** id={p?.replyTo***REMOVED*** /> <Post key={p._id***REMOVED*** id={p._id***REMOVED*** /></>
              )
            : <Placeholder content={activeTab***REMOVED*** />)
  ***REMOVED***

    {(activeTab == 'Likes')
      && ((Array.isArray(userData?.likes)) && (userData?.likes?.length > 0)
        ? userData?.likes
          ?.map(p =>
            <Post key={p***REMOVED*** id={p***REMOVED*** />
          )
        : <Placeholder content={activeTab***REMOVED*** />)
  ***REMOVED***
  </>)
***REMOVED***

function EditButton ({show, set***REMOVED***) {
  if (!show) return ' '

  function editInfo () {
    set(state => {state.show = !!!state?.show***REMOVED***)
***REMOVED***

  return (
  <button
    onClick={() => editInfo()***REMOVED***
    class='hover:bg-yellow-50 border rounded-full py-2 px-4 float-right text-md font-bold border-yellow-500 text-yellow-500'
  >
    Edit Profile
  </button>)
***REMOVED***


function TabItem ({children: currentTab, setActiveTab, activeTab***REMOVED***) {
  return (
    <div
      onClick={() => setActiveTab(currentTab)***REMOVED***
      class={
        `text-${activeTab == currentTab ? 'yellow-500 border-b-4 border-yellow-500' : 'gray-500'***REMOVED***
        flex-grow py-4 font-black text-lg hover:bg-yellow-100 hover:text-yellow-500 cursor-pointer`
    ***REMOVED***
    >
    {currentTab***REMOVED***
    </div>
 )
***REMOVED***


function Placeholder ({content***REMOVED***) {
  return (
    <div class='py-12 text-xl text-center bg-gray-100'>
      {`Nothing to see here... No ${content***REMOVED*** Found`***REMOVED***
    </div>
  )
***REMOVED***
