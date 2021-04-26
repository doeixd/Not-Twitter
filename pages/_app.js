import '../styles/index.css'
import React, { useEffect ***REMOVED*** from 'react'
import { signIn, signOut, useSession ***REMOVED*** from 'next-auth/client'
import { QueryClient, QueryClientProvider ***REMOVED*** from 'react-query'
import { Hydrate ***REMOVED*** from 'react-query/hydration'
import { ReactQueryDevtools ***REMOVED*** from 'react-query/devtools'
import "reflect-metadata";
import { useStore ***REMOVED*** from "../lib/store"
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
//   ***REMOVED***,
// ***REMOVED***,
// ***REMOVED***)

export default function MyApp({ Component, pageProps ***REMOVED***) {
  const [ session, loading ] = useSession()
  // const { status, data, error, isFetching, isLoading ***REMOVED*** = usePosts();
  const {set, preview, replyTo, quotes, show, showPostModal***REMOVED*** = useStore(state => ({set: state.set, preview: state.preview, replyTo: state.replyTo, quotes: state.quotes, show: state.show, showPostModal: state.showPostModal, activeTab: 'Posts'***REMOVED***), shallow)


  useEffect(() => {
    if (!loading && session?.user) set(state => session?.user)
    set(state => {state.lastPage = '/'***REMOVED***)
***REMOVED***,[loading, session])

  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={signIn***REMOVED***>Sign in</button>
    </>***REMOVED***
    {session && <>
    <QueryClientProvider client={queryClient***REMOVED***>
      <Hydrate state={pageProps.dehydratedState***REMOVED***>
      <ProfilePreview id={preview***REMOVED***/>
      <ReplyModal quotes={quotes***REMOVED*** replyTo={replyTo***REMOVED*** showPostModal={showPostModal***REMOVED*** handle={preview***REMOVED***/>
      <EditProfileModal show={show ?? false***REMOVED*** />
      <div id='container' class="divide-x divide-gray-200 align-baseline min-h-screen">
        <Sidebar />

        <div class='inline-flex flex-grow flex-shrink divide-x divide-gray-200'>
          <div style={{maxWidth: '990px', display: 'inline-flex'***REMOVED******REMOVED*** class='md:flex-grow' >
        <main class='w-615 sm:w-full flex flex-col flex-shrink flex-grow divide-y divide-gray-200'>
              <Component {...pageProps***REMOVED*** />
            </main>
            <RightSidebar />
          </div>
        </div>

        <PostButton />
        <TabNav />
      </div>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false***REMOVED*** />
    </QueryClientProvider> </> ***REMOVED***
  </>
***REMOVED***
