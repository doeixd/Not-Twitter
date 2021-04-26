import Link from 'next/link'
import { useStore ***REMOVED*** from "../lib/store"
import { useEffect ***REMOVED*** from 'react'
import useWindowSize from '../lib/useWindowSize'

export default function ProfileLink ({id, children, showPreview = true***REMOVED***) {
  const set = useStore(state => state.set)
  const {width: screenWidth***REMOVED*** = useWindowSize()

  if (screenWidth <= 812) showPreview = false
  const showProfilePreview = showPreview ? useProfilePreview(id, set) : undefined
  
  useEffect(() =>{
    return () => {
      set(state => {state.preview = null***REMOVED***)
  ***REMOVED*** 
***REMOVED***,[])

  return (
    <Link href={`/${id***REMOVED***`***REMOVED***><span onClick={e =>{ e.stopPropagation(); set(state => {state.lastPage = window.location***REMOVED***)***REMOVED******REMOVED*** class='contents cursor-pointer' onMouseOver={showProfilePreview***REMOVED***>{children***REMOVED***</span></Link>  
  )
***REMOVED***


var useProfilePreview = (id, set) => (e) => {
  set(state => {state.preview = id***REMOVED***)

  const preview = document.querySelector('#profile-preview')
  if (!preview) return

  let showPreviewTimeout;
  let hidePreviewTimeout;
  clearTimeout(hidePreviewTimeout)

  const linkPosInViewport = e.target.getBoundingClientRect()
  const isDisplayedBelow = window.innerHeight - linkPosInViewport.bottom > preview.offsetHeight
  const linkPosInWindow = {top: linkPosInViewport.top + window.pageYOffset, right: linkPosInViewport.right + window.pageXOffset, bottom: linkPosInViewport.bottom + window.pageYOffset, left: linkPosInViewport.left + window.pageXOffset***REMOVED***
  const previewCenter = Math.floor((preview.offsetWidth/2) - (e.target.offsetWidth/2) ) 

  showPreviewTimeout = setTimeout(() => {
    preview.style.zIndex = 10
    preview.style.opacity = 1
    preview.style.left = `${linkPosInWindow.left - previewCenter***REMOVED***px` 
    preview.style.top = isDisplayedBelow ? `${linkPosInWindow.bottom + 10***REMOVED***px` : `${linkPosInWindow.top - preview.offsetHeight - 10***REMOVED***px`
***REMOVED***, 750);

    e.target.addEventListener('mouseleave', e => {
        clearTimeout(showPreviewTimeout)
        hidePreviewTimeout = setTimeout(()=> {
          preview.style.opacity = 0 
          preview.style.zIndex = -1
          setTimeout(() => {
            preview.style.top = '-700px'
        ***REMOVED***, 30);
      ***REMOVED***, 250) 
  ***REMOVED***)

    preview.addEventListener('mouseover', e => {
      clearTimeout(hidePreviewTimeout)
  ***REMOVED***)

    preview.addEventListener('mouseleave', () => {
        preview.style.opacity = 0
        preview.style.zIndex = -1
        setTimeout(() => {
          preview.style.top = '-700px'
      ***REMOVED***, 30);
  ***REMOVED***)  
***REMOVED***