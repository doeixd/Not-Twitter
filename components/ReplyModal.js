import { useEffect, useState ***REMOVED*** from 'react';
import {getUser, useFollowUser***REMOVED*** from '../lib/queryHooks'
import Link from 'next/link'
import { useStore ***REMOVED*** from '../lib/store'
import Post from './Post'
import WritePost from './WritePost';
import useWindowSize from '../lib/useWindowSize';
import Icons from './icons';


export default function ReplyModal ({id, handle, replyTo = null, quotes = null, showPostModal = null***REMOVED***) {
  const set = useStore(state => state.set)
  const {width: screenWidth***REMOVED*** = useWindowSize()

  const closeModal = () => {
    document.querySelector('html').style.overflow = 'initial'
    set(state => {
      state.quotes = null
      state.replyTo = null
      state.showPostModal = null
  ***REMOVED***)
***REMOVED***
  useEffect(() =>{
    if (replyTo || quotes || showPostModal) {
      document.querySelector('html').style.overflow = 'hidden'
      return closeModal
  ***REMOVED***
***REMOVED***,[replyTo, quotes])

  if(!replyTo && !quotes && !showPostModal) return <> </>


  return ( <>
    <div id='reply-modal' class='fixed z-50'>
      <div class='absolute top-0 w-screen h-screen bg-black opacity-25  z-40'> </div>
      <div class='flex w-screen place-content-center sm:h-screen pt-36 sm:p-0'>
        <div id='profile-preview' class='transition-opacity opacity-100 z-50 rounded-2xl sm:rounded-none shadow bg-white w-120 h-auto max-h-120 sm:max-h-screen overflow-auto sm:w-screen'>
          <div class=' border-b border-gray-300 p-3 sm:p-2'>
            <div onClick={()=>closeModal()***REMOVED*** class='group content hover:bg-yellow-100 p-1 ml-1 sm:ml-3 rounded-full w-min cursor-pointer'>
              {
                (screen.width > 815)
                  ? <Icons name='x' options={{width: '7', color:'yellow-500', mdWidth: '7'***REMOVED******REMOVED*** /> 
                  : <Icons name='backArrow' options={{width: '7', color:'yellow-500', mdWidth: '7'***REMOVED******REMOVED*** /> 
            ***REMOVED***
              {/* <svg viewBox="0 0 24 24"  class="stroke-0 cursor-pointer fill-current w-7 text-yellow-500"><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg> */***REMOVED***
            </div>
           </div> 
          <div class='p-2'>
            {replyTo && <Post id={replyTo***REMOVED*** isInFeed={false***REMOVED***/>***REMOVED***
            <div class='pt-2'>
              <WritePost quotes={quotes***REMOVED*** replyTo={replyTo***REMOVED*** placeholder={'Post Your Reply'***REMOVED***/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
***REMOVED***