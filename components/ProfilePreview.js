import { useEffect, useState ***REMOVED*** from 'react';
import {getUser, useFollowUser***REMOVED*** from '../lib/queryHooks'
import Link from 'next/link'
import { useStore ***REMOVED*** from '../lib/store'

export default function ProfilePreview ({id***REMOVED***) {
  const {isLoading, data, error***REMOVED*** = getUser(id)
  const set = useStore(state => state.set)

  useEffect(() => {
    return () => {
      set(state => {
        state.preview = null
    ***REMOVED***)
  ***REMOVED***
***REMOVED***, [])


  if(!id || isLoading && !data) return <></>
  return (
    <div id='profile-preview' class='transition-opacity p-5 rounded-2xl absolute shadow -z-1 opacity-0 bg-white w-72'>
      <div class='pb-1'>
        <Link href={`/${id***REMOVED***`***REMOVED***>
          <a><img class='h-14 w-14 top-3 rounded-full inline cursor-pointer' src={data?.image ?? 'https://www.thispersondoesnotexist.com/image'***REMOVED*** /></a>
        </Link>
        <FollowButton id={id***REMOVED*** />
      </div>
      <Link href={`/${id***REMOVED***`***REMOVED***><a>
        <div class='font-bold pr-2 cursor-pointer hover:underline'>{data?.name || 'REDACTED'***REMOVED***</div>
        <div class='text-gray-500 pr-3 cursor-pointer hover:underline'>{data?.handle ?? ('@' + (data?.name?.split(' ').join('') ?? 'REDACTED'))***REMOVED***</div>
        <div class='py-3 cursor-pointer'>{data?.about ?? ''***REMOVED***</div></a>
      </Link>
      <div class='space-x-5'>
        <span><span class='text-gray-900 font-bold'>{data?.followerCount ?? 0***REMOVED***</span> <span class='text-gray-500'>Followers</span></span>
        <span><span class='text-gray-900 font-bold'>{data?.followingCount ?? 0***REMOVED***</span> <span class='text-gray-500'>Following</span></span>
      </div>
    </div>
  )
***REMOVED***


function FollowButton ({id***REMOVED***) {
  const [state, setState] = useState('Following')
  const {id: curID, following***REMOVED*** = useStore()
  const followUser = useFollowUser(curID)
  const isFollowing = following.includes(id)

  if (curID == id) return <> </>

  if(isFollowing){
    return <button onMouseOut={(_, msg = 'Following') => setState(msg)***REMOVED*** onMouseOver={(e, msg = 'Unfollow') => setState(msg)***REMOVED*** class='py-2 px-3 bg-yellow-500 text-white cursor-pointer font-bold rounded-full float-right hover:bg-red-600' >{state***REMOVED***</button>
***REMOVED***

  return <button onClick={() => followUser.mutate(id,curID)***REMOVED*** class='py-2 px-3 border border-yellow-500 cursor-pointer text-yellow-500 font-bold rounded-full float-right hover:bg-yellow-50'>Follow</button>

***REMOVED***
