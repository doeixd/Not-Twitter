import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getUser, getPost, getPostsFromUser } from '../lib/queryHooks'
import { useRouter } from 'next/router'
import Post from '../components/Post'
import { useStore } from "../lib/store"
import {useState} from 'react'
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
  const {query: {userID} } = router

  const id = useStore(state => state.id)
  const set = useStore(state => state.set)
  const lastPage = useStore(state => state.lastPage)
  // const activeTab = useStore(state => state.activeTab)

  const [activeTab, setActiveTab] = useState('Posts')

  const {isLoading: isUserLoading, error: userError, data: userData} = getUser(userID)
  const {isLoading: isPostLoading, error: postError, data: postData} = getPostsFromUser(userID)

  if (isPostLoading || isUserLoading) return "Loading..."

  return (<>
      {/* <img src={data.image} /> */}
      {/* <div>{user?.name}</div>  */}
      <div class='w-full flex items-center py-3 pl-5 space-x-4 self-start sticky top-0 z-10 bg-white'>
        <span class='hover:bg-yellow-100 rounded-full p-1 transition-all content'>
          <svg onClick={() => router.push(lastPage,undefined,{shallow:true})} viewBox="0 0 24 24" class="inline stroke-0 cursor-pointer w-8 text-yellow-500 fill-current"><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>
        </span>
        <h1 class='font-bold text-xl inline '>{userData?.name}</h1>
      </div>
      {/* <div class='h-10'></div> */}
    <div>
        <div class='relative'>
          <img src='https://thisartworkdoesnotexist.com/' class='w-full h-44' />
          <img src={userData?.image} class='w-36 h-36 border-8 border-white rounded-full absolute top-24 box-content left-5' />
          <div class='min-w-full h-20 flex flex-row-reverse p-5'>
            <EditButton show={id == userID} set={set} />
          </div>
          <div class='px-4'>
            <div class='text-xl font-semibold'>{userData?.name}</div>
            <div class='text-gray-500 '>@{userData?.handle}</div>
            <p class='py-2'>{userData?.about}</p>
            <div class='text-gray-500 align-text-bottom'> <svg viewBox="0 0 24 24" class=" inline stroke-0 w-5 align-text-bottom fill-current"><g><path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path><circle cx="7.032" cy="8.75" r="1.285"></circle><circle cx="7.032" cy="13.156" r="1.285"></circle><circle cx="16.968" cy="8.75" r="1.285"></circle><circle cx="16.968" cy="13.156" r="1.285"></circle><circle cx="12" cy="8.75" r="1.285"></circle><circle cx="12" cy="13.156" r="1.285"></circle><circle cx="7.032" cy="17.486" r="1.285"></circle><circle cx="12" cy="17.486" r="1.285"></circle></g></svg> Joined {new Date(userData?.createdAt).toDateString()}</div>
            <div class='pt-4 space-x-5'>
              <span><span class='text-gray-900 font-bold'>{userData?.followerCount ?? 0}</span> <span class='text-gray-500'>Followers</span></span>
              <span><span class='text-gray-900 font-bold'>{userData?.followingCount ?? 0}</span> <span class='text-gray-500'>Following</span></span>
            </div>
          </div>
        <div class='flex flex-row text-center justify-evenly pt-8 border-b border-gray-200 '>
          <TabItem setActiveTab={setActiveTab} activeTab={activeTab}>Posts</TabItem>
          <TabItem setActiveTab={setActiveTab} activeTab={activeTab}>Replies</TabItem>
          <TabItem setActiveTab={setActiveTab} activeTab={activeTab}>Likes</TabItem>
        </div>
      </div>
    </div>

    {(activeTab == 'Posts')
       && ((postData?.filter(post => !!!post?.replyTo)?.length > 0)
        ? postData
          ?.filter(post => !!!post?.replyTo)
          ?.map(({_id: p}) => <Post key={p} id={p} />)
        : <Placeholder content={activeTab}/>
       )
    }

    {(activeTab == 'Replies')
      && ((postData?.filter(post => !!post?.replyTo).length > 0)
            ? postData
              ?.filter(post => !!post?.replyTo)
              ?.map((p,_,arr) =>
                <><Post key={p?.replyTo} id={p?.replyTo} /> <Post key={p._id} id={p._id} /></>
              )
            : <Placeholder content={activeTab} />)
    }

    {(activeTab == 'Likes')
      && ((Array.isArray(userData?.likes)) && (userData?.likes?.length > 0)
        ? userData?.likes
          ?.map(p =>
            <Post key={p} id={p} />
          )
        : <Placeholder content={activeTab} />)
    }
  </>)
}

function EditButton ({show, set}) {
  if (!show) return ' '

  function editInfo () {
    set(state => {state.show = !!!state?.show})
  }

  return (
  <button
    onClick={() => editInfo()}
    class='hover:bg-yellow-50 border rounded-full py-2 px-4 float-right text-md font-bold border-yellow-500 text-yellow-500'
  >
    Edit Profile
  </button>)
}


function TabItem ({children: currentTab, setActiveTab, activeTab}) {
  return (
    <div
      onClick={() => setActiveTab(currentTab)}
      class={
        `text-${activeTab == currentTab ? 'yellow-500 border-b-4 border-yellow-500' : 'gray-500'}
        flex-grow py-4 font-black text-lg hover:bg-yellow-100 hover:text-yellow-500 cursor-pointer`
      }
    >
    {currentTab}
    </div>
 )
}


function Placeholder ({content}) {
  return (
    <div class='py-12 text-xl text-center bg-gray-100'>
      {`Nothing to see here... No ${content} Found`}
    </div>
  )
}
