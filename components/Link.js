import Link from 'next/link'
import { useStore } from '../lib/store'


export default function CustomLink({children, ...props }) {
  const set = useStore(state => state.set)
  const currentUser = useStore(state => state.id)

  const handleClick = e => {
    e.stopPropagation()
    set(state => {state.lastPage = `${window.location}`})
  }

  props.href =
    (props?.href == '/profile')
      ? `/${currentUser}`
      : props?.href

  const linkClasses =
    props?.class
      ? `cursor-pointer ${props?.class}`
      : 'underline cursor-pointer contents'

  return (
    <Link {...props}>
      <a
        class={linkClasses}
        onClick={e => handleClick(e)}>
        {children}
      </a>
    </Link>
  )
}
