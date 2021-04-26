import {useEffect***REMOVED*** from 'react'
import {getUser, useEditProfile, useFollowUser***REMOVED*** from '../lib/queryHooks'
import Link from 'next/link'
import { useStore ***REMOVED*** from '../lib/store'
import Post from './Post'
import WritePost from './WritePost';
import shallow from 'zustand/shallow'

export default function EditProfileModal ({show***REMOVED***) {
  const {set, id***REMOVED*** = useStore(state => ({set: state.set, id: state.id***REMOVED***),shallow)
  const state = useStore(state)
  const editProfile = useEditProfile()

  const closeModal = () => {
    document.querySelector('html').style.overflow = 'initial'
    set(state => {state.show = false***REMOVED***)
***REMOVED***

  useEffect(() =>{
    if (show) {
      document.querySelector('html').style.overflow = 'hidden'
      return closeModal
  ***REMOVED***
***REMOVED***,[show])


  const submit = (e) => {
    e.preventDefault()
    const handle = document.querySelector('handle')
    const about = document.querySelector('#about')?.value
    console.log({handle, about***REMOVED***);
    (handle || about) && editProfile.mutate({handle, about, set, id***REMOVED***)
***REMOVED***

  const {isLoading, data***REMOVED*** = getUser(id)

  if(!show || isLoading || !data) return <> </>


  return ( <>
    <div class='fixed z-50'>
      <div class='absolute top-0 w-screen h-screen bg-black opacity-25  z-40'> </div>
      <div class='flex w-screen place-content-center pt-36'>
        <div class='transition-opacity opacity-100 z-50 rounded-2xl shadow bg-white w-min h-auto max-h-120 overflow-auto'>
          <div class=' border-b border-gray-300 p-2'>
            <div class='group content hover:bg-yellow-100 p-1 ml-1 rounded-full w-min'>
              <svg viewBox="0 0 24 24" onClick={()=>closeModal()***REMOVED*** class="stroke-0 cursor-pointer fill-current w-7 text-yellow-500">
                <g>
                  <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z">
                  </path>
                </g>
              </svg>
            </div>
           </div>
          <div class='px-8 pb-8 pt-6'>
            <form class='w-min mx-auto mb-15'>
              <div class='text-sm font-bold text-gray-800 pl-1 pb-1'>Handle </div>
              <input id='handle' class='border border-gray-300 transition-all focus:ring-1 focus:ring-yellow-500 outline-none rounded-full py-2 px-4 mb-4' placeholder={`@${data?.handle***REMOVED***`***REMOVED*** />
              <div class='text-sm font-bold text-gray-800 pl-1 pb-1'>About You </div>
              <input id='about' class='border border-gray-300 focus:ring-1 focus:ring-yellow-500 outline-none rounded-full py-2 px-4 mb-4' placeholder={data?.about || 'Profile Description'***REMOVED*** />
              <button onClick={e => submit(e)***REMOVED*** class='float-right mt-7 py-2 px-4 rounded-full border border-yellow-500 hover:bg-yellow-50 font-bold text-yellow-500'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>)
***REMOVED***
