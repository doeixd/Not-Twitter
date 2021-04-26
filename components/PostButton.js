import { useRouter } from "next/router";
import { useStore } from "../lib/store";
import Icon from "./icons";
import CustomLink from "./Link";
import useWindowSize from '../lib/useWindowSize'

export default function PostButton () {
  const router = useRouter()
  const set = useStore(state => state.set)
  const {width: screenWidth} = useWindowSize()

  const isComment = router.pathname == '/posts/[postID]' 
 
  const handleClick = (e) => {
    if (isComment) return set(state => {state.replyTo = router?.query?.postID})
    set(state => {
      state.showPostModal = true
      state.replyTo = null
      state.quotes = null
    })
  } 
  
  if (screenWidth >= 812) return <></>
  
  return (
    <>
      <button onClick={e => handleClick(e)} class='p-3.5 bg-yellow-500 fixed bottom-18 right-5 outline-none rounded-full shadow-2xl cursor-pointer group focus:bg-yellow-600'>
        <Icon 
          name='quill' 
          options={{color: 'white', mdWidth: '6', hoverColor: 'white'}} 
          changeOnPath='/posts/[postID]' 
          activeIconName='comment' />
      </button>
    </>
  )
}
