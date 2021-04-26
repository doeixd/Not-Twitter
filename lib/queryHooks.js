import {useQuery, useMutation} from 'react-query'
import axios from 'axios'
import queryClient from './queryClient'

export const getUser = (userID, query = '', options = {enable: !!userID}) => useQuery(['user', userID], async () => {
  if(!userID) return {}
  const { data } = await axios.get('/api/users/' + userID + (query ? `/${query}` : ''))
  return data
}, options)
// {staleTime: 172800000, cacheTime: 172800000/2,}

//  refreshInterval: 15000
export const getPost = (postID, options = {enable: !!postID,}) => useQuery(['post', postID], async () => {
  if(postID < 100000) return queryClient.getQueryData(['post',postID])
  const { data: postData } = await axios.get(`/api/posts/${postID}`)
  return postData
}, options)


export const getNotifications = (options = {}) => useQuery('notifications', async () => {
  const { data: notifications } = await axios.get(`/api/notifications`)
  return notifications
}, options)


export const getTrendsFromTwitter = () => useQuery('trends', async () => {
  const {data: {trends} } = await axios.get(`/api/trends`)
  return trends
}, {staleTime: 600001})

export const getSearchResults = (query) => useQuery(['search', query],
  async _ => {
    const {data: results} = await axios.get(`/api/search/${query}`)
    return results
  },
  {
    // select: ({posts}) => {
    //   return posts
    // },
    onSuccess: ({posts, users, people}) => {
      console.log({posts, users, people});
      posts?.forEach(post => {
        queryClient.setQueryData(['post', post._id], post)
      })
      Object.values(users)?.forEach(user => {
        queryClient.setQueryData(['user', user._id], user)
      })
      people?.forEach(user => {
        queryClient.setQueryData(['user', user._id], user)
      })
      queryClient.setQueryData(['search', query, 'top'], posts)
      queryClient.setQueryData(['search', query, 'latest'], posts.sort((a,b) => new Date(a.createdAt) < new Date(b.createdAt)))
      queryClient.setQueryData(['search', query, 'people'], people)
  } }
)


export const getPostsFromUser = (userID, options = {enable: !!userID, refreshInterval: 15000}) => useQuery(['allUsersPosts', userID], async () => {
  const { data: postData } = await axios.get(`/api/users/posts/${userID}`)
  return postData
}, {
  onSuccess: (data) => {
    data.forEach(post => {
      queryClient.setQueryData(['post',post._id], post)
    })
  }
,...options })

export const useFollowUser = (curID, options = {}) => useMutation((userID) => {
  return axios.post('/api/follow/' + userID)
}, {onSuccess: async () => {
    await queryClient.refetchQueries(['user', userID])
    await queryClient.refetchQueries(['user', curID])
   }, ...options},)

export const useLikePost = (postID, options = {}) => useMutation(postID => {
  return axios.post('/api/like/' + postID)
},
{
  onMutate: () => {
    queryClient.setQueryData(['post',postID],
      (oldData => {
        oldData.likes = oldData.isLiked ? oldData.likes - 1 : oldData.likes + 1
        oldData.isLiked = !oldData.isLiked
        return oldData
      }))
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries(['post', postID])
     // queryClient.invalidateQueries('feed')
   }, ...options})


export const useCreatePost = () => useMutation(({post}) => {

  return axios.post('/api/posts', post)
}, {
  onMutate: async ({variables: {set, postEl, replyTo, replyToHandle, quotes, id}}) => {
    const random = Math.floor(Math.random() * 100000)


    const post = {
      _id: `${random}`,
      content: postEl.current.value,
      replyTo: replyTo ?? null,
      replyToHandle,
      likes: 0,
      quotes,
      createdBy: id,
      createdAt: new Date(),
      isLiked: false,
    }
    queryClient.setQueryData(
      ['post', random], post
    )

    queryClient.setQueryData(['allUsersPosts',window.location.pathname.slice(1) ], (oldData = []) => {
      return [post, ...oldData]
    })

    queryClient.setQueryData('feed', (oldData = []) => {
      return [random, ...oldData]
    })

    if (quotes) 
      queryClient.setQueryData(['post', quotes], quotesData => (
        {...quotesData, quoteCount: quotesData.quoteCount + 1, isReposted: true}
      ))

    if (replyTo) 
      queryClient.setQueryData(['post', replyTo], oldData => (
        {...oldData, replyCount: oldData.replyCount + 1, replies: [random, ...oldData.replies] }
      ))

    postEl.current.value = ''
    set(state => {state.replyTo = null; state.quotes = null; state.showPostModal = null})
    document.querySelector('html').style.overflow = 'initial'

    return random
  },
  onSuccess: async ({ data },{quotes, replyTo},random) => {
    console.log('data:', data)
    queryClient.setQueryData(['post',data._id], data)
    queryClient.setQueryData('feed', (oldData = []) => {
      const replaceIndex =  oldData.indexOf(random)
      oldData.splice(replaceIndex, 1, data._id)
      return oldData
     })
    queryClient.removeQueries(['post', random])
    replyTo && await queryClient.invalidateQueries(['post', replyTo])
    quotes && await queryClient.invalidateQueries(['post', quotes])
    await queryClient.invalidateQueries('feed')
    await queryClient.invalidateQueries('allUsersPosts')
  }
})

export const useDeletePost = (postID, options = {}) => useMutation(postID => {
  console.log('deleted: ', postID)
  return axios.delete('/api/posts/' + postID)
}, {
  onMutate: () => {
    let {createdBy} = queryClient.getQueryData(['post', postID])
    queryClient.removeQueries(['post', postID])
    queryClient.setQueryData(['allUsersPosts', createdBy], (oldData = []) => {
      return oldData?.filter(p => p?._id != postID)
    })
    queryClient.setQueryData('feed', (oldData = [])=> {
      return oldData.filter(p => p != postID )
    })
  }, ...options } )


export const useEditProfile = () => useMutation(({about, handle}) => {
  return axios.put('/api/users', {about, handle} )
}, {
  onMutate: ({id, about, handle, set}) => {
    queryClient.setQueryData(['user',id], (oldData = {}) => {
      oldData.about = about
      oldData.handle = handle
      return oldData
    })
    set(state => {state.show = false})
    document.querySelector('html').style.overflow = 'initial'
  },
})

