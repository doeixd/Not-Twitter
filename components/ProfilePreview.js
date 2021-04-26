import { useEffect, useState } from 'react';
import {getUser, useFollowUser} from '../lib/queryHooks'
import Link from 'next/link'
import { useStore } from '../lib/store'

export default function ProfilePreview ({id}) {
  const {isLoading, data, error} = getUser(id)
  const set = useStore(state => state.set)

  useEffect(() => {
    return () => {
      set(state => {
        state.preview = null
      })
    }
  }, [])


  if(!id || isLoading && !data) return <></>
  return (
    <div id='profile-preview' class='transition-opacity p-5 rounded-2xl absolute shadow -z-1 opacity-0 bg-white w-72'>
      <div class='pb-1'>
        <Link href={`/${id}`}>
          <a><img class='h-14 w-14 top-3 rounded-full inline cursor-pointer' src={data?.image ?? 'https://www.thispersondoesnotexist.com/image'} /></a>
        </Link>
        <FollowButton id={id} />
      </div>
      <Link href={`/${id}`}><a>
        <div class='font-bold pr-2 cursor-pointer hover:underline'>{data?.name || 'REDACTED'}</div>
        <div class='text-gray-500 pr-3 cursor-pointer hover:underline'>{data?.handle ?? ('@' + (data?.name?.split(' ').join('') ?? 'REDACTED'))}</div>
        <div class='py-3 cursor-pointer'>{data?.about ?? ''}</div></a>
      </Link>
      <div class='space-x-5'>
        <span><span class='text-gray-900 font-bold'>{data?.followerCount ?? 0}</span> <span class='text-gray-500'>Followers</span></span>
        <span><span class='text-gray-900 font-bold'>{data?.followingCount ?? 0}</span> <span class='text-gray-500'>Following</span></span>
      </div>
    </div>
  )
}


function FollowButton ({id}) {
  const [state, setState] = useState('Following')
  const {id: curID, following} = useStore()
  const followUser = useFollowUser(curID)
  const isFollowing = following.includes(id)

  if (curID == id) return <> </>

  if(isFollowing){
    return <button onMouseOut={(_, msg = 'Following') => setState(msg)} onMouseOver={(e, msg = 'Unfollow') => setState(msg)} class='py-2 px-3 bg-yellow-500 text-white cursor-pointer font-bold rounded-full float-right hover:bg-red-600' >{state}</button>
  }

  return <button onClick={() => followUser.mutate(id,curID)} class='py-2 px-3 border border-yellow-500 cursor-pointer text-yellow-500 font-bold rounded-full float-right hover:bg-yellow-50'>Follow</button>

}
