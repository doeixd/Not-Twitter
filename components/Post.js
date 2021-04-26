import TimeAgo from 'react-timeago'
import CustomLink from './Link'
import {getPost, getUser, useLikePost, useCreatePost, useDeletePost } from '../lib/queryHooks'
import ProfileLink from './ProfileLink'
import { useStore } from '../lib/store'
import useWindowSize from '../lib/useWindowSize'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Icon from './icons'


const Content = ({main, data, isInFeed, curID}) => <>
  <div class={`max-w-120 break-all ${main && "text-lg"}`}>
    {
      data?.content?.split(' ')?.map((i, idx, arr) => {
        let isTag = i.match(/(?<=#)\w+/)?.[0]
        if (isTag) return <CustomLink class={'hover:underline contents text-yellow-500'} key={i} href={`/search/${isTag}`}><span class=''>{` #${isTag} `}</span></CustomLink>

        let isHandle = i.match(/(?<=@)\w+/)?.[0]
        if (isHandle) return <ProfileLink showPreview={isInFeed} id={curID} key={i}><span class='text-yellow-500 hover:underline'>{`@${isHandle}`}</span></ProfileLink>

        return <span class='' key={`${i} ${idx} ${data?._id}`}>{`${i} `}</span>
      })?? 'Post Can Not Be Displayed'
    }
  </div>
  {data?.quotes && <Post id={data?.quotes} mini={true} />}
</>


export default function Post ({id: postID, isInFeed = true, main=false, mini=false}) {
  const set = useStore(state => state.set)
  const like = useLikePost(postID)
  // const repost = useRepost(postID)
  const deletePost = useDeletePost(postID)
  const router = useRouter()
  const {width: screenWidth} = useWindowSize()
  const curID = useStore(state => state.id)

  let date;

  const {isLoading: isPostLoading, error: postError, data: postData} = getPost(postID)
  const {isLoading: isUserLoading, error: userError, data: userData} = getUser(postData?.createdBy)

  if (isPostLoading || isUserLoading) return <> </>

  const data = Object.assign({...userData, userLikes: userData.likes} ?? {}, postData ?? {})
  /* data.content = data.content.replace(/(#)\w+/g, '<Link href="/tags/$&"><a class="z-10 text-yellow-500">$`$&</a></Link>') */


  const comment = (e) => {
    e.stopPropagation()
    set(state => {state.replyTo = postID })
    set(state => {state.quotes = null })
  }

  const repost = (e) => {
    e.stopPropagation()
    set(state => {state.quotes = postID })
    set(state => {state.replyTo = null })
  }

  const likeIt = (e) => {
    e.stopPropagation()
    like.mutate(postID)

  }

  const showDelete = e => {
    e.stopPropagation()
    const deleteEl = document.querySelector(`#delete${postID}`)
    if (deleteEl) {
      deleteEl.style.display = 'block'
      deleteEl.style.opacity = 1
      document.addEventListener('click',d => {
        d.target
      })
      deleteEl.addEventListener('mouseleave', () => {
        deleteEl.style.display = 'none'
        deleteEl.style.opacity = 0
      })
      deleteEl.addEventListener('click', () => {
        // e.stopPropagation()
        deletePost.mutate(postID)
      })
    }
  }

  if (main) return (
        <div class="px-4 pt-4 post-container">
          {data?.replyTo && ( <div class='relative -top-2 text-gray-400 pb-1 pl-1'> {" "} Replying To <span class="text-yellow-500">@{data?.replyToHandle}</span> </div>)}
          <div class="inline-flex flex-row gap-2">
            <ProfileLink id={data?.createdBy} handle={data?.handle ?? "patrickg"} showPreview={isInFeed}>
              <img class="preview-profile h-14 w-14 sm:w-11 sm:h-11 top-3 rounded-full inline" src={ data?.image ?? "https://www.thispersondoesnotexist.com/image" } />
            </ProfileLink>
            <div class="pt-2 sm:pt-0">
              <ProfileLink id={data?.createdBy} showPreview={isInFeed} handle={data?.handle ?? "patrickg"}>
                <span class="font-bold pr-2 hover:underline">{data?.name || "REDACTED"}</span>
              </ProfileLink>
              <ProfileLink id={data?.createdBy} showPreview={isInFeed} handle={data?.handle ?? "patrickg"}>
                <div class="text-gray-500 pr-3 hover:underline">
                  {`@${(data?.handle ?? data?.name?.split(" ").join("") ?? "REDACTED")}`}
                </div>
              </ProfileLink>
            </div>
          </div>
    {(data?.createdBy == curID && isInFeed) && (<span onClick={(e) => e.stopPropagation()} class='relative z-0 float-right'>
      <span onClick={e => showDelete(e)} class="group hover:bg-yellow-100 rounded-full p-2"><Icon name='opts' /></span>
      <div id={`delete${postID}`} class='w-max rounded-md transition-all opacity-0 hidden top-0 absolute left-0 sm:-left-16 bg-white shadow-md p-3 text-red-500 hover:bg-gray-50 cursor-pointer'>
      <Icon name='trash' options={{color: 'red-500', hoverColor:'red-500'}} /><span> Delete</span>
      </div>
      </span>)}
          <div class="w-full">
            {<Content {...{data, main, isInFeed, curID}}/>}
            {/* <div class={`max-w-96 break-all pt-4 pb-8 text-2xl`} dangerouslySetInnerHTML={{ __html: data?.content ??  " ", }}></div> */}
            <div class="text-gray-500 py-4">
              {
                ((date = new Date(data?.createdAt)),
                `${date
                  .toLocaleTimeString()
                  .replace(/:\d\d /, " ")} · ${date
                  .toDateString()
                  .replace(/\w+ /, "")}`)
              }
            </div>
            <div class="py-3 border-t border-b border-gray-200 space-x-5 text-gray-500 pl-1">
              <span>
                <span class="font-bold text-gray-700">
                  {data?.replyCount ?? 0}
                </span> Replies
              </span>
              <span>
                <span class="font-bold text-gray-700">{data?.quoteCount ?? 0}</span> Quotes
              </span>
              <span>
                <span class="font-bold text-gray-700">{data?.likes}</span> Likes
              </span>
            </div>
            <div class="flex flex-row justify-around w-full py-3 sm:py-2">
              <span onClick={(e) => comment(e)} class="text-gray-400 group hover:text-yellow-500">
                <span class="transition-all block group-hover:bg-yellow-100 group-hover:content rounded-full p-2">
                  <Icon name='comment' options={{width: '6', mdWidth: '5'}} />
                </span>
              </span>
              <span class="space-x-5 text-gray-400 group hover:text-green-500">
                <span onClick={e => repost(e)} class="transition-all block group-hover:bg-green-100 group-hover:content rounded-full p-2">
                  <Icon name='repost' options={{width: '6', mdWidth: '5', hoverColor: 'green-500'}} />
                </span>
              </span>
              <span onClick={(e) => likeIt(e)} class={`space-x-5 text-${ data?.isLiked ? "red" : "gray" }-500  block group hover:text-red-400`}>
                <span class="transition-all  block group-hover:bg-red-100 group-hover:content rounded-full p-2">
                  {data?.isLiked
                    ? <Icon name={'heartFilled'} options={{ width: '6', minWidth: '5', color: "red-500", hoverColor: 'red-500'}} />
                    : <Icon name={'heart'} options={{width: '6', minWidth: '5', hoverColor: 'red-500'}} />
                  }
                </span>
              </span>
              <span class="space-x-2 text-gray-500 group hover:text-yellow-500">
                <span class="transition-all block group-hover:bg-yellow-100 group-hover:content rounded-full p-2">
                  <Icon name='share' options={{width: '6', mdWidth: '5'}} />
                </span>
              </span>
            </div>
          </div>
        </div>
      )

  if (mini) return (<div class='mt-3 border border-gray-300 rounded-lg p-2'>
  {data?.replyTo && ( <div> {" "} Replying To <span class="text-yellow-500">{data?.replyToHandle}</span> </div>)}
  <div class="flex flex-row gap-2">
    <ProfileLink id={data?.createdBy} showPreview={isInFeed} handle={data?.handle ?? "patrickg"}>
      <img class="preview-profile h-6 w-6 top-3 rounded-full inline" src={ data?.image ?? "https://www.thispersondoesnotexist.com/image" } />
    </ProfileLink>
    <div class="">
      <ProfileLink id={data?.createdBy} showPreview={isInFeed} handle={data?.handle ?? "patrickg"}>
        <span class="hover:underline font-bold pr-2">{data?.name || "REDACTED"}</span>
      </ProfileLink>
      <ProfileLink id={data?.createdBy} showPreview={isInFeed} handle={data?.handle ?? "patrickg"}>
        <span class="text-gray-500 pr-3 hover:underline">
          {data?.handle ??  "@" + (data?.name?.split(" ").join("") ?? "REDACTED")}
        </span>
      </ProfileLink>
    </div>
  </div>
  <div class="w-full">
    {<Content {...{data, main, isInFeed, curID}}/>}
    {/* <div class={`max-w-96 break-all pt-1 pb-1`} dangerouslySetInnerHTML={{ __html: data?.content ??  " ", }}></div> */}
  </div>
  </div>)

  if(!data?.content) return <></>

  return (
    <div
      onClick={() => router.push(`/posts/${postID}`, undefined, {shallow: true})}
      id="post-container"
      class="p-3 sm:p-2 hover:bg-gray-50 transition-colors cursor-pointer w-full">
      <div class="flex gap-5 sm:gap-2">
        <ProfileLink id={data?.createdBy} handle={data?.handle ?? "patrickg"}>
          <img class="preview-profile flex-shrink-0  h-14 w-14 sm:h-11 sm:w-11 rounded-full inline"
            src={data?.image ?? "https://www.thispersondoesnotexist.com/image"}
          />
        </ProfileLink>
        <div class="w-full">
        <span class=' max-w-85p flex-shrink inline-flex sm:space-between flex-row align-baseline sm:justify-between'>
     <div className='inline-flex flex-shrink flex-nowrap max-w-85p'>
          <ProfileLink
            id={data?.createdBy}
            showPreview={isInFeed}
            handle={data?.handle ?? "patrickg"}>
            <span class="font-bold pr-2 hover:underline truncate max-w-65p flex-shrink">
              {data?.name || "REDACTED"}
            </span>
          </ProfileLink>
          <ProfileLink
            id={data?.createdBy}
            showPreview={isInFeed}
            handle={data?.handle ?? "patrickg"}>
            <span class="text-gray-500 pr-3 hover:underline truncate flex-shrink">
              {`@${(data?.handle ?? data?.name?.split(" ").join("") ?? "REDACTED")}`}
            </span>
          </ProfileLink>
    </div>
          <div class="text-gray-400 truncate flex-grow flex-shrink max-w-65p">
            { screenWidth > 768
              ? <TimeAgo date={data?.createdAt} />
              : new Date(data?.createdAt).toDateString().split(' ').reduce((...[acc,,,arr])=> acc ? acc : `${arr[2]} ${arr[1]}${new Date().getFullYear() == arr[3] ? '' : (', ' + arr[3])}`, false)
              }
          </div>
          </span>
          {(data?.createdBy == curID && isInFeed) && (<span onClick={(e) => e.stopPropagation()} class='relative z-0 float-right'>
            <span onClick={e => showDelete(e)} class="group hover:bg-yellow-100 rounded-full p-2"><Icon name='opts' /></span>
            <div id={`delete${postID}`} class='w-max rounded-md transition-all opacity-0 hidden top-0 absolute left-0 sm:-left-16 bg-white shadow-md p-3 text-red-500 hover:bg-gray-50 cursor-pointer'>
              <Icon name='trash' options={{color: 'red-500', hoverColor:'red-500'}} /><span> Delete</span>
            </div>
          </span>)}

          {(data?.replyTo && isInFeed) && (
            <div class="text-gray-500 pb-2">
              Replying To{" "}
              <span class="text-yellow-500">
                @{data?.replyToHandle}
              </span>
            </div>
          )}
          {/* <div */}
            {/* class={`max-w-96 break-all ${main && "text-lg"}`} */}
            {/* dangerouslySetInnerHTML={{ __html: data?.content ?? " " }}></div> */}
          {/* {data?.quotes && <Post id={data?.quotes} mini={true} />} */}
          {<Content {...{data, main, isInFeed, curID}}/>}
          {isInFeed ? (
            <div class="text-gray-500 flex flex-row justify-between w-4/5 sm:w-full pt-4">
              <div class="group hover:text-yellow-500">
                <span
                  onClick={e => comment(e)}
                  class="transition-all group-hover:bg-yellow-100 rounded-full p-2 sm:p-1 mr-1.5">
                  <Icon name='comment' />
                </span>
                {data?.replyCount}
              </div>

              <div class={` text-${data?.isReposted ? 'green' : 'gray'}-500 group hover:text-green-500`}>
                <span
                  onClick={e => repost(e)}
                  class="transition-all group-hover:bg-green-100 rounded-full p-2 sm:p-1 mr-1.5">
                {
                  data?.isReposted
                  ? <Icon name='repostFilled' options={{color:'green-500', hoverColor: "green-500"}} />
                  : <Icon name='repost' options={{hoverColor: "green-500"}} />
                }
                </span>
                {data?.quoteCount ?? 0}
              </div>

              <div
                onClick={e => likeIt(e)}
                class={`text-${
                  data?.isLiked ? "red" : "gray"
                }-500 group hover:text-red-400`}>
                <span class="transition-all group-hover:bg-red-100 rounded-full p-2 sm:p-1 mr-1.5">
                  {data?.isLiked
                    ? <Icon name={'heartFilled'} options={{ color: "red-500", hoverColor: 'red-500', color: 'red-500'}} />
                    : <Icon name={'heart'} options={{color:'red', hoverColor: 'red-500'}} />
                  }
                </span>
                {data?.likes ?? 0}
              </div>

              <div class="group hover:text-yellow-500">
                <span class="transition-all group-hover:bg-yellow-100 rounded-full p-2 sm:p-1 mr-1.5">
                  <Icon name='share' />
                </span>
              </div>
            </div>
          ) : (
            <div class="text-gray-500 pt-3">
              {" "}
              Replying to{" "}
              <span class="text-yellow-500">
                @{data?.handle ?? "handle"}
              </span>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
