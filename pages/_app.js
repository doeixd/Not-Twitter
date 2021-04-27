import '../styles/index.css'
import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import "reflect-metadata";
import { useStore } from "../lib/store"
import ProfilePreview from '../components/ProfilePreview'
import queryClient from '../lib/queryClient'
import ReplyModal from '../components/ReplyModal'
import EditProfileModal from '../components/EditProfileModal'
import shallow from 'zustand/shallow'
import TabNav from '../components/TabNav'
import PostButton from '../components/PostButton'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'
// let queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       // cacheTime: 1000 * 60 * 60 * 24,
//     },
//   },
// })

export default function MyApp({ Component, pageProps }) {
  const [ session, loading ] = useSession()
  // const { status, data, error, isFetching, isLoading } = usePosts();
  const {set, preview, replyTo, quotes, show, showPostModal} = useStore(state => ({set: state.set, preview: state.preview, replyTo: state.replyTo, quotes: state.quotes, show: state.show, showPostModal: state.showPostModal, activeTab: 'Posts'}), shallow)


  useEffect(() => {
    if (!loading && session?.user) set(state => session?.user)
  },[loading, session])

  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={signIn}>Sign in</button>
    </>}
    {session && <>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
      <ProfilePreview id={preview}/>
      <ReplyModal quotes={quotes} replyTo={replyTo} showPostModal={showPostModal} handle={preview}/>
      <EditProfileModal show={show ?? false} />
      <div id='container' class="divide-x divide-gray-200 align-baseline min-h-screen">
        <Sidebar />

        <div class='inline-flex flex-grow flex-shrink divide-x divide-gray-200'>
          <div style={{maxWidth: '990px', display: 'inline-flex'}} class='md:flex-grow' >
        <main class='w-615 sm:w-full flex flex-col flex-shrink flex-grow divide-y divide-gray-200'>
              <Component {...pageProps} />
            </main>
            <RightSidebar />
          </div>
        </div>

        <PostButton />
        <TabNav />
      </div>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider> </> }
  </>
}
