import TimeAgo from 'react-timeago'
import CustomLink from './Link'
import {getPost, getUser, useLikePost, useCreatePost, useDeletePost ***REMOVED*** from '../lib/queryHooks'
import ProfileLink from './ProfileLink'
import { useStore ***REMOVED*** from '../lib/store'
import useWindowSize from '../lib/useWindowSize'
import { useState ***REMOVED*** from 'react'
import { useRouter ***REMOVED*** from 'next/router'
import Icon from './icons'


const Content = ({main, data, isInFeed, curID***REMOVED***) => <>
  <div class={`max-w-120 break-all ${main && "text-lg"***REMOVED***`***REMOVED***>
    {
      data?.content?.split(' ')?.map((i, idx, arr) => {
        let isTag = i.match(/(?<=#)\w+/)?.[0]
        if (isTag) return <CustomLink class={'hover:underline contents text-yellow-500'***REMOVED*** key={i***REMOVED*** href={`/search/${isTag***REMOVED***`***REMOVED***><span class=''>{` #${isTag***REMOVED*** `***REMOVED***</span></CustomLink>

        let isHandle = i.match(/(?<=@)\w+/)?.[0]
        if (isHandle) return <ProfileLink showPreview={isInFeed***REMOVED*** id={curID***REMOVED*** key={i***REMOVED***><span class='text-yellow-500 hover:underline'>{`@${isHandle***REMOVED***`***REMOVED***</span></ProfileLink>

        return <span class='' key={`${i***REMOVED*** ${idx***REMOVED*** ${data?._id***REMOVED***`***REMOVED***>{`${i***REMOVED*** `***REMOVED***</span>
    ***REMOVED***)?? 'Post Can Not Be Displayed'
  ***REMOVED***
  </div>
  {data?.quotes && <Post id={data?.quotes***REMOVED*** mini={true***REMOVED*** />***REMOVED***
</>


export default function Post ({id: postID, isInFeed = true, main=false, mini=false***REMOVED***) {
  const set = useStore(state => state.set)
  const like = useLikePost(postID)
  // const repost = useRepost(postID)
  const deletePost = useDeletePost(postID)
  const router = useRouter()
  const {width: screenWidth***REMOVED*** = useWindowSize()
  const curID = useStore(state => state.id)

  let date;

  const {isLoading: isPostLoading, error: postError, data: postData***REMOVED*** = getPost(postID)
  const {isLoading: isUserLoading, error: userError, data: userData***REMOVED*** = getUser(postData?.createdBy)

  if (isPostLoading || isUserLoading) return <> </>

  const data = Object.assign({...userData, userLikes: userData.likes***REMOVED*** ?? {***REMOVED***, postData ?? {***REMOVED***)
  /* data.content = data.content.replace(/(#)\w+/g, '<Link href="/tags/$&"><a class="z-10 text-yellow-500">$`$&</a></Link>') */


  const comment = (e) => {
    e.stopPropagation()
    set(state => {state.replyTo = postID ***REMOVED***)
    set(state => {state.quotes = null ***REMOVED***)
***REMOVED***

  const repost = (e) => {
    e.stopPropagation()
    set(state => {state.quotes = postID ***REMOVED***)
    set(state => {state.replyTo = null ***REMOVED***)
***REMOVED***

  const likeIt = (e) => {
    e.stopPropagation()
    like.mutate(postID)

***REMOVED***

  const showDelete = e => {
    e.stopPropagation()
    const deleteEl = document.querySelector(`#delete${postID***REMOVED***`)
    if (deleteEl) {
      deleteEl.style.display = 'block'
      deleteEl.style.opacity = 1
      document.addEventListener('click',d => {
        d.target
    ***REMOVED***)
      deleteEl.addEventListener('mouseleave', () => {
        deleteEl.style.display = 'none'
        deleteEl.style.opacity = 0
    ***REMOVED***)
      deleteEl.addEventListener('click', () => {
        // e.stopPropagation()
        deletePost.mutate(postID)
    ***REMOVED***)
  ***REMOVED***
***REMOVED***

  if (main) return (
        <div class="px-4 pt-4 post-container">
          {data?.replyTo && ( <div class='relative -top-2 text-gray-400 pb-1 pl-1'> {" "***REMOVED*** Replying To <span class="text-yellow-500">@{data?.replyToHandle***REMOVED***</span> </div>)***REMOVED***
          <div class="inline-flex flex-row gap-2">
            <ProfileLink id={data?.createdBy***REMOVED*** handle={data?.handle ?? "patrickg"***REMOVED*** showPreview={isInFeed***REMOVED***>
              <img class="preview-profile h-14 w-14 sm:w-11 sm:h-11 top-3 rounded-full inline" src={ data?.image ?? "https://www.thispersondoesnotexist.com/image" ***REMOVED*** />
            </ProfileLink>
            <div class="pt-2 sm:pt-0">
              <ProfileLink id={data?.createdBy***REMOVED*** showPreview={isInFeed***REMOVED*** handle={data?.handle ?? "patrickg"***REMOVED***>
                <span class="font-bold pr-2 hover:underline">{data?.name || "REDACTED"***REMOVED***</span>
              </ProfileLink>
              <ProfileLink id={data?.createdBy***REMOVED*** showPreview={isInFeed***REMOVED*** handle={data?.handle ?? "patrickg"***REMOVED***>
                <div class="text-gray-500 pr-3 hover:underline">
                  {`@${(data?.handle ?? data?.name?.split(" ").join("") ?? "REDACTED")***REMOVED***`***REMOVED***
                </div>
              </ProfileLink>
            </div>
          </div>
    {(data?.createdBy == curID && isInFeed) && (<span onClick={(e) => e.stopPropagation()***REMOVED*** class='relative z-0 float-right'>
      <span onClick={e => showDelete(e)***REMOVED*** class="group hover:bg-yellow-100 rounded-full p-2"><Icon name='opts' /></span>
      <div id={`delete${postID***REMOVED***`***REMOVED*** class='w-max rounded-md transition-all opacity-0 hidden top-0 absolute left-0 sm:-left-16 bg-white shadow-md p-3 text-red-500 hover:bg-gray-50 cursor-pointer'>
      <Icon name='trash' options={{color: 'red-500', hoverColor:'red-500'***REMOVED******REMOVED*** /><span> Delete</span>
      </div>
      </span>)***REMOVED***
          <div class="w-full">
            {<Content {...{data, main, isInFeed, curID***REMOVED******REMOVED***/>***REMOVED***
            {/* <div class={`max-w-96 break-all pt-4 pb-8 text-2xl`***REMOVED*** dangerouslySetInnerHTML={{ __html: data?.content ??  " ", ***REMOVED******REMOVED***></div> */***REMOVED***
            <div class="text-gray-500 py-4">
              {
                ((date = new Date(data?.createdAt)),
                `${date
                  .toLocaleTimeString()
                  .replace(/:\d\d /, " ")***REMOVED*** · ${date
                  .toDateString()
                  .replace(/\w+ /, "")***REMOVED***`)
            ***REMOVED***
            </div>
            <div class="py-3 border-t border-b border-gray-200 space-x-5 text-gray-500 pl-1">
              <span>
                <span class="font-bold text-gray-700">
                  {data?.replyCount ?? 0***REMOVED***
                </span> Replies
              </span>
              <span>
                <span class="font-bold text-gray-700">{data?.quoteCount ?? 0***REMOVED***</span> Quotes
              </span>
              <span>
                <span class="font-bold text-gray-700">{data?.likes***REMOVED***</span> Likes
              </span>
            </div>
            <div class="flex flex-row justify-around w-full py-3 sm:py-2">
              <span onClick={(e) => comment(e)***REMOVED*** class="text-gray-400 group hover:text-yellow-500">
                <span class="transition-all block group-hover:bg-yellow-100 group-hover:content rounded-full p-2">
                  <Icon name='comment' options={{width: '6', mdWidth: '5'***REMOVED******REMOVED*** />
                </span>
              </span>
              <span class="space-x-5 text-gray-400 group hover:text-green-500">
                <span onClick={e => repost(e)***REMOVED*** class="transition-all block group-hover:bg-green-100 group-hover:content rounded-full p-2">
                  <Icon name='repost' options={{width: '6', mdWidth: '5', hoverColor: 'green-500'***REMOVED******REMOVED*** />
                </span>
              </span>
              <span onClick={(e) => likeIt(e)***REMOVED*** class={`space-x-5 text-${ data?.isLiked ? "red" : "gray" ***REMOVED***-500  block group hover:text-red-400`***REMOVED***>
                <span class="transition-all  block group-hover:bg-red-100 group-hover:content rounded-full p-2">
                  {data?.isLiked
                    ? <Icon name={'heartFilled'***REMOVED*** options={{ width: '6', minWidth: '5', color: "red-500", hoverColor: 'red-500'***REMOVED******REMOVED*** />
                    : <Icon name={'heart'***REMOVED*** options={{width: '6', minWidth: '5', hoverColor: 'red-500'***REMOVED******REMOVED*** />
                ***REMOVED***
                </span>
              </span>
              <span class="space-x-2 text-gray-500 group hover:text-yellow-500">
                <span class="transition-all block group-hover:bg-yellow-100 group-hover:content rounded-full p-2">
                  <Icon name='share' options={{width: '6', mdWidth: '5'***REMOVED******REMOVED*** />
                </span>
              </span>
            </div>
          </div>
        </div>
      )

  if (mini) return (<div class='mt-3 border border-gray-300 rounded-lg p-2'>
  {data?.replyTo && ( <div> {" "***REMOVED*** Replying To <span class="text-yellow-500">{data?.replyToHandle***REMOVED***</span> </div>)***REMOVED***
  <div class="flex flex-row gap-2">
    <ProfileLink id={data?.createdBy***REMOVED*** showPreview={isInFeed***REMOVED*** handle={data?.handle ?? "patrickg"***REMOVED***>
      <img class="preview-profile h-6 w-6 top-3 rounded-full inline" src={ data?.image ?? "https://www.thispersondoesnotexist.com/image" ***REMOVED*** />
    </ProfileLink>
    <div class="">
      <ProfileLink id={data?.createdBy***REMOVED*** showPreview={isInFeed***REMOVED*** handle={data?.handle ?? "patrickg"***REMOVED***>
        <span class="hover:underline font-bold pr-2">{data?.name || "REDACTED"***REMOVED***</span>
      </ProfileLink>
      <ProfileLink id={data?.createdBy***REMOVED*** showPreview={isInFeed***REMOVED*** handle={data?.handle ?? "patrickg"***REMOVED***>
        <span class="text-gray-500 pr-3 hover:underline">
          {data?.handle ??  "@" + (data?.name?.split(" ").join("") ?? "REDACTED")***REMOVED***
        </span>
      </ProfileLink>
    </div>
  </div>
  <div class="w-full">
    {<Content {...{data, main, isInFeed, curID***REMOVED******REMOVED***/>***REMOVED***
    {/* <div class={`max-w-96 break-all pt-1 pb-1`***REMOVED*** dangerouslySetInnerHTML={{ __html: data?.content ??  " ", ***REMOVED******REMOVED***></div> */***REMOVED***
  </div>
  </div>)

  if(!data?.content) return <></>

  return (
    <div
      onClick={() => router.push(`/posts/${postID***REMOVED***`, undefined, {shallow: true***REMOVED***)***REMOVED***
      id="post-container"
      class="p-3 sm:p-2 hover:bg-gray-50 transition-colors cursor-pointer w-full">
      <div class="flex gap-5 sm:gap-2">
        <ProfileLink id={data?.createdBy***REMOVED*** handle={data?.handle ?? "patrickg"***REMOVED***>
          <img class="preview-profile flex-shrink-0  h-14 w-14 sm:h-11 sm:w-11 rounded-full inline"
            src={data?.image ?? "https://www.thispersondoesnotexist.com/image"***REMOVED***
          />
        </ProfileLink>
        <div class="w-full">
        <span class=' max-w-85p flex-shrink inline-flex sm:space-between flex-row align-baseline sm:justify-between'>
     <div className='inline-flex flex-shrink flex-nowrap max-w-85p'>
          <ProfileLink
            id={data?.createdBy***REMOVED***
            showPreview={isInFeed***REMOVED***
            handle={data?.handle ?? "patrickg"***REMOVED***>
            <span class="font-bold pr-2 hover:underline truncate max-w-65p flex-shrink">
              {data?.name || "REDACTED"***REMOVED***
            </span>
          </ProfileLink>
          <ProfileLink
            id={data?.createdBy***REMOVED***
            showPreview={isInFeed***REMOVED***
            handle={data?.handle ?? "patrickg"***REMOVED***>
            <span class="text-gray-500 pr-3 hover:underline truncate flex-shrink">
              {`@${(data?.handle ?? data?.name?.split(" ").join("") ?? "REDACTED")***REMOVED***`***REMOVED***
            </span>
          </ProfileLink>
    </div>
          <div class="text-gray-400 truncate flex-grow flex-shrink max-w-65p">
            { screenWidth > 768
              ? <TimeAgo date={data?.createdAt***REMOVED*** />
              : new Date(data?.createdAt).toDateString().split(' ').reduce((...[acc,,,arr])=> acc ? acc : `${arr[2]***REMOVED*** ${arr[1]***REMOVED***${new Date().getFullYear() == arr[3] ? '' : (', ' + arr[3])***REMOVED***`, false)
            ***REMOVED***
          </div>
          </span>
          {(data?.createdBy == curID && isInFeed) && (<span onClick={(e) => e.stopPropagation()***REMOVED*** class='relative z-0 float-right'>
            <span onClick={e => showDelete(e)***REMOVED*** class="group hover:bg-yellow-100 rounded-full p-2"><Icon name='opts' /></span>
            <div id={`delete${postID***REMOVED***`***REMOVED*** class='w-max rounded-md transition-all opacity-0 hidden top-0 absolute left-0 sm:-left-16 bg-white shadow-md p-3 text-red-500 hover:bg-gray-50 cursor-pointer'>
              <Icon name='trash' options={{color: 'red-500', hoverColor:'red-500'***REMOVED******REMOVED*** /><span> Delete</span>
            </div>
          </span>)***REMOVED***

          {(data?.replyTo && isInFeed) && (
            <div class="text-gray-500 pb-2">
              Replying To{" "***REMOVED***
              <span class="text-yellow-500">
                @{data?.replyToHandle***REMOVED***
              </span>
            </div>
          )***REMOVED***
          {/* <div */***REMOVED***
            {/* class={`max-w-96 break-all ${main && "text-lg"***REMOVED***`***REMOVED*** */***REMOVED***
            {/* dangerouslySetInnerHTML={{ __html: data?.content ?? " " ***REMOVED******REMOVED***></div> */***REMOVED***
          {/* {data?.quotes && <Post id={data?.quotes***REMOVED*** mini={true***REMOVED*** />***REMOVED*** */***REMOVED***
          {<Content {...{data, main, isInFeed, curID***REMOVED******REMOVED***/>***REMOVED***
          {isInFeed ? (
            <div class="text-gray-500 flex flex-row justify-between w-4/5 sm:w-full pt-4">
              <div class="group hover:text-yellow-500">
                <span
                  onClick={e => comment(e)***REMOVED***
                  class="transition-all group-hover:bg-yellow-100 rounded-full p-2 sm:p-1 mr-1.5">
                  <Icon name='comment' />
                </span>
                {data?.replyCount***REMOVED***
              </div>

              <div class={` text-${data?.isReposted ? 'green' : 'gray'***REMOVED***-500 group hover:text-green-500`***REMOVED***>
                <span
                  onClick={e => repost(e)***REMOVED***
                  class="transition-all group-hover:bg-green-100 rounded-full p-2 sm:p-1 mr-1.5">
                {
                  data?.isReposted
                  ? <Icon name='repostFilled' options={{color:'green-500', hoverColor: "green-500"***REMOVED******REMOVED*** />
                  : <Icon name='repost' options={{hoverColor: "green-500"***REMOVED******REMOVED*** />
              ***REMOVED***
                </span>
                {data?.quoteCount ?? 0***REMOVED***
              </div>

              <div
                onClick={e => likeIt(e)***REMOVED***
                class={`text-${
                  data?.isLiked ? "red" : "gray"
              ***REMOVED***-500 group hover:text-red-400`***REMOVED***>
                <span class="transition-all group-hover:bg-red-100 rounded-full p-2 sm:p-1 mr-1.5">
                  {data?.isLiked
                    ? <Icon name={'heartFilled'***REMOVED*** options={{ color: "red-500", hoverColor: 'red-500', color: 'red-500'***REMOVED******REMOVED*** />
                    : <Icon name={'heart'***REMOVED*** options={{color:'red', hoverColor: 'red-500'***REMOVED******REMOVED*** />
                ***REMOVED***
                </span>
                {data?.likes ?? 0***REMOVED***
              </div>

              <div class="group hover:text-yellow-500">
                <span class="transition-all group-hover:bg-yellow-100 rounded-full p-2 sm:p-1 mr-1.5">
                  <Icon name='share' />
                </span>
              </div>
            </div>
          ) : (
            <div class="text-gray-500 pt-3">
              {" "***REMOVED***
              Replying to{" "***REMOVED***
              <span class="text-yellow-500">
                @{data?.handle ?? "handle"***REMOVED***
              </span>{" "***REMOVED***
            </div>
          )***REMOVED***
        </div>
      </div>
    </div>
  )
***REMOVED***
