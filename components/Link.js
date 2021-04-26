import Link from 'next/link'
import { useStore ***REMOVED*** from '../lib/store'


export default function CustomLink({children, ...props ***REMOVED***) {
  const set = useStore(state => state.set)
  const currentUser = useStore(state => state.id)

  const handleClick = e => {
    e.stopPropagation()
    set(state => {state.lastPage = `${window.location***REMOVED***`***REMOVED***)
***REMOVED***

  props.href =
    (props?.href == '/profile')
      ? `/${currentUser***REMOVED***`
      : props?.href

  const linkClasses =
    props?.class
      ? `cursor-pointer ${props?.class***REMOVED***`
      : 'underline cursor-pointer contents'

  return (
    <Link {...props***REMOVED***>
      <a
        class={linkClasses***REMOVED***
        onClick={e => handleClick(e)***REMOVED***>
        {children***REMOVED***
      </a>
    </Link>
  )
***REMOVED***
