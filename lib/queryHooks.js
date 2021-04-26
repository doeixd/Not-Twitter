import {useQuery, useMutation***REMOVED*** from 'react-query'
import axios from 'axios'
import queryClient from './queryClient'

export const getUser = (userID, query = '', options = {enable: !!userID***REMOVED***) => useQuery(['user', userID], async () => {
  if(!userID) return {***REMOVED***
  const { data ***REMOVED*** = await axios.get('/api/users/' + userID + (query ? `/${query***REMOVED***` : ''))
  return data
***REMOVED***, options)
// {staleTime: 172800000, cacheTime: 172800000/2,***REMOVED***

//  refreshInterval: 15000
export const getPost = (postID, options = {enable: !!postID,***REMOVED***) => useQuery(['post', postID], async () => {
  if(postID < 100000) return queryClient.getQueryData(['post',postID])
  const { data: postData ***REMOVED*** = await axios.get(`/api/posts/${postID***REMOVED***`)
  return postData
***REMOVED***, options)


export const getNotifications = (options = {***REMOVED***) => useQuery('notifications', async () => {
  const { data: notifications ***REMOVED*** = await axios.get(`/api/notifications`)
  return notifications
***REMOVED***, options)


export const getTrendsFromTwitter = () => useQuery('trends', async () => {
  const {data: {trends***REMOVED*** ***REMOVED*** = await axios.get(`/api/trends`)
  return trends
***REMOVED***, {staleTime: 600001***REMOVED***)

export const getSearchResults = (query) => useQuery(['search', query],
  async _ => {
    const {data: results***REMOVED*** = await axios.get(`/api/search/${query***REMOVED***`)
    return results
***REMOVED***,
  {
    // select: ({posts***REMOVED***) => {
    //   return posts
    // ***REMOVED***,
    onSuccess: ({posts, users, people***REMOVED***) => {
      console.log({posts, users, people***REMOVED***);
      posts?.forEach(post => {
        queryClient.setQueryData(['post', post._id], post)
    ***REMOVED***)
      Object.values(users)?.forEach(user => {
        queryClient.setQueryData(['user', user._id], user)
    ***REMOVED***)
      people?.forEach(user => {
        queryClient.setQueryData(['user', user._id], user)
    ***REMOVED***)
      queryClient.setQueryData(['search', query, 'top'], posts)
      queryClient.setQueryData(['search', query, 'latest'], posts.sort((a,b) => new Date(a.createdAt) < new Date(b.createdAt)))
      queryClient.setQueryData(['search', query, 'people'], people)
***REMOVED*** ***REMOVED***
)


export const getPostsFromUser = (userID, options = {enable: !!userID, refreshInterval: 15000***REMOVED***) => useQuery(['allUsersPosts', userID], async () => {
  const { data: postData ***REMOVED*** = await axios.get(`/api/users/posts/${userID***REMOVED***`)
  return postData
***REMOVED***, {
  onSuccess: (data) => {
    data.forEach(post => {
      queryClient.setQueryData(['post',post._id], post)
  ***REMOVED***)
***REMOVED***
,...options ***REMOVED***)

export const useFollowUser = (curID, options = {***REMOVED***) => useMutation((userID) => {
  return axios.post('/api/follow/' + userID)
***REMOVED***, {onSuccess: async () => {
    await queryClient.refetchQueries(['user', userID])
    await queryClient.refetchQueries(['user', curID])
 ***REMOVED***, ...options***REMOVED***,)

export const useLikePost = (postID, options = {***REMOVED***) => useMutation(postID => {
  return axios.post('/api/like/' + postID)
***REMOVED***,
{
  onMutate: () => {
    queryClient.setQueryData(['post',postID],
      (oldData => {
        oldData.likes = oldData.isLiked ? oldData.likes - 1 : oldData.likes + 1
        oldData.isLiked = !oldData.isLiked
        return oldData
    ***REMOVED***))
***REMOVED***,
  onSuccess: async () => {
    await queryClient.invalidateQueries(['post', postID])
     // queryClient.invalidateQueries('feed')
 ***REMOVED***, ...options***REMOVED***)


export const useCreatePost = () => useMutation(({post***REMOVED***) => {

  return axios.post('/api/posts', post)
***REMOVED***, {
  onMutate: async ({variables: {set, postEl, replyTo, replyToHandle, quotes, id***REMOVED******REMOVED***) => {
    const random = Math.floor(Math.random() * 100000)


    const post = {
      _id: `${random***REMOVED***`,
      content: postEl.current.value,
      replyTo: replyTo ?? null,
      replyToHandle,
      likes: 0,
      quotes,
      createdBy: id,
      createdAt: new Date(),
      isLiked: false,
  ***REMOVED***
    queryClient.setQueryData(
      ['post', random], post
    )

    queryClient.setQueryData(['allUsersPosts',window.location.pathname.slice(1) ], (oldData = []) => {
      return [post, ...oldData]
  ***REMOVED***)

    queryClient.setQueryData('feed', (oldData = []) => {
      return [random, ...oldData]
  ***REMOVED***)

    if (quotes) 
      queryClient.setQueryData(['post', quotes], quotesData => (
        {...quotesData, quoteCount: quotesData.quoteCount + 1, isReposted: true***REMOVED***
      ))

    if (replyTo) 
      queryClient.setQueryData(['post', replyTo], oldData => (
        {...oldData, replyCount: oldData.replyCount + 1, replies: [random, ...oldData.replies] ***REMOVED***
      ))

    postEl.current.value = ''
    set(state => {state.replyTo = null; state.quotes = null; state.showPostModal = null***REMOVED***)
    document.querySelector('html').style.overflow = 'initial'

    return random
***REMOVED***,
  onSuccess: async ({ data ***REMOVED***,{quotes, replyTo***REMOVED***,random) => {
    console.log('data:', data)
    queryClient.setQueryData(['post',data._id], data)
    queryClient.setQueryData('feed', (oldData = []) => {
      const replaceIndex =  oldData.indexOf(random)
      oldData.splice(replaceIndex, 1, data._id)
      return oldData
   ***REMOVED***)
    queryClient.removeQueries(['post', random])
    replyTo && await queryClient.invalidateQueries(['post', replyTo])
    quotes && await queryClient.invalidateQueries(['post', quotes])
    await queryClient.invalidateQueries('feed')
    await queryClient.invalidateQueries('allUsersPosts')
***REMOVED***
***REMOVED***)

export const useDeletePost = (postID, options = {***REMOVED***) => useMutation(postID => {
  console.log('deleted: ', postID)
  return axios.delete('/api/posts/' + postID)
***REMOVED***, {
  onMutate: () => {
    let {createdBy***REMOVED*** = queryClient.getQueryData(['post', postID])
    queryClient.removeQueries(['post', postID])
    queryClient.setQueryData(['allUsersPosts', createdBy], (oldData = []) => {
      return oldData?.filter(p => p?._id != postID)
  ***REMOVED***)
    queryClient.setQueryData('feed', (oldData = [])=> {
      return oldData.filter(p => p != postID )
  ***REMOVED***)
***REMOVED***, ...options ***REMOVED*** )


export const useEditProfile = () => useMutation(({about, handle***REMOVED***) => {
  return axios.put('/api/users', {about, handle***REMOVED*** )
***REMOVED***, {
  onMutate: ({id, about, handle, set***REMOVED***) => {
    queryClient.setQueryData(['user',id], (oldData = {***REMOVED***) => {
      oldData.about = about
      oldData.handle = handle
      return oldData
  ***REMOVED***)
    set(state => {state.show = false***REMOVED***)
    document.querySelector('html').style.overflow = 'initial'
***REMOVED***,
***REMOVED***)

