import { useStore ***REMOVED*** from "../lib/store"
import { useEffect, useRef ***REMOVED*** from 'react'
import axios from 'axios';
import {useCreatePost ***REMOVED*** from '../lib/queryHooks'
import Post from './Post'
import { useQueryClient ***REMOVED*** from 'react-query'

export default function WritePost ({placeholder = 'Whats Happening?', replyTo = null, quotes = null***REMOVED***) {

  const {image, id, set***REMOVED*** = useStore()
  const postEl = useRef(null)
  const createPost = useCreatePost()
  const queryClient = useQueryClient()

  const submit = (e) => {
    e.preventDefault()
    const replyToHandle =
      (replyTo
        && queryClient.getQueryData(['user', queryClient.getQueryData(['post', replyTo])?.createdBy])?.handle)
          ?? null

    if (postEl.current.value.length == 0 || postEl.current.value.length > 140){
      postEl.current.value = postEl.current.value.slice(0,-1)
      return
  ***REMOVED***

    createPost.mutate({
      post: { content: postEl.current.value, replyTo, replyToHandle, quotes ***REMOVED***,
      variables: { set, postEl, replyTo, replyToHandle, quotes, id ***REMOVED***,
  ***REMOVED***)

***REMOVED***

  const onInput = (e) => {
    e.target.parentNode.dataset.replicatedValue = e.target.value
    const button = document.querySelector('#submit')

    if(e.target.value.length > 0 && e.target.value.length < 140) {
      button.classList.remove('bg-yellow-500-dark')
      button.classList.add('bg-yellow-500-light')
      return
  ***REMOVED***
      button.classList.remove('bg-yellow-500-light')
      button.classList.add('bg-yellow-500-dark')
***REMOVED***

  return (
    <>
    <div class='flex p-3'>
    <img src={image***REMOVED*** class='h-14 w-14 sm:w-11 sm:h-11 sm:mt-1.5 rounded-full' />
      <form class='w-full border-gray-200 inline-flex flex-shrink flex-col'>
        <div class="grow-wrap">
          <textarea ref={postEl***REMOVED*** class='placeholder-gray-600 text-xl max-w-full break-all' name="text" placeholder={placeholder***REMOVED*** onInput={onInput***REMOVED***></textarea>
        </div>
        {quotes && <Post mini={true***REMOVED*** id={quotes***REMOVED*** />***REMOVED***
        <button id='submit' onClick={submit***REMOVED*** class='bg-yellow-500-dark mt-2 py-2.5 px-3.5 text-white font-bold border-0 rounded-full self-end sm:fixed sm:top-0.5 sm:right-4'>Submit</button>
      </form>
    </div>
    </>
  )
***REMOVED***
