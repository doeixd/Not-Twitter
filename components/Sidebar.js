import { getUser } from "../lib/queryHooks";
import { useStore } from "../lib/store";
import Icon from "./icons";
import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from './Link'
import { useLayoutEffect, useState } from "react";

export default function Sidebar(props) {
  const currentUser = useStore(state => state)
  const set = useStore(state => state.set)
  const router = useRouter()

  const showLogOut = e => {
    const logoutModal = document.querySelector('#logoutModal')
    const userInfo = document.querySelector('#currentUser')

    logoutModal.style.display = 'block'

    const userInfo_WindowOffsetTop = userInfo.getBoundingClientRect().top + window.pageYOffset
    const userInfo_Middle = userInfo.offsetWidth/2

    const leftPosition = screen.width <= 1400 ? (userInfo_Middle - 20) : 0
    const topPosition =  userInfo_WindowOffsetTop - (logoutModal.offsetHeight + 20)

    logoutModal.style.left = `${leftPosition}px`
    logoutModal.style.top = `${topPosition}px`


    const hideWhenClickOutside = (e) => {
      if (logoutModal.contains(e.target) || logoutModal.style.display === 'none' || userInfo.contains(e.target)) return
      logoutModal.style.display = 'none'
      document.removeEventListener('click', hideWhenClickOutside);
    }
    document.addEventListener('click', hideWhenClickOutside);
  }

  const showModal = e => {
    set(state => {
      state.showPostModal = true
      state.replyTo = null
      state.quotes = null
    })
  }

  return (
    <>
      <div style={{width: 80}} class="flex-grow-2 md:flex-grow inline-flex items-end flex-col sm:hidden">
        <div class="fixed max-w-290 px-3 pt-1 pb-2 flex flex-col h-full lg:items-end">
          <div class="block">
            <span class="group inline-block pl-1">
              <span
                class=" space-x-4 transition-all  group block group-hover:bg-yellow-100 group-hover:content rounded-full p-2">
                <Icon name='bird' options={{ width: "9", color: "yellow-500" }} />
              </span>
            </span>
          </div>
          <div class="py-3.5 space-y-1">
            <SidebarItem href='/' icon='house'>
              Home
            </SidebarItem>

            <SidebarItem href='/search' icon='hashTag'>
              Explore
            </SidebarItem>
            <SidebarItem href='/notifications' icon='bell'>
              Notifications
            </SidebarItem>

            <SidebarItem href={`/${currentUser.id}`} icon='person'>
              Profile
            </SidebarItem>
          </div>
          <button onClick={e => showModal(e)} class="lg:w-min mt-3 mr-5 lg:m-0 text-white rounded-full font-bold text-lg bg-yellow-500-light">
            <div class='lg:hidden py-3 px-4.5 w-full'>
              New Post
            </div>
            <div class='lg:flex hidden p-3'>
              <Icon name='quill' options={{color: 'white', width:'7', height:'7'}} />
            </div>
          </button>
          <div id="logoutModal" class="hidden pb-2 absolute bg-white shadow-lg rounded-2xl">
            <div class="p-4 flex">
              <img
                class="h-12 w-12 rounded-full inline float-left"
                src={currentUser?.image}
              />
              <div class="inline float-left px-4 pb-4 truncate max-w-85p">
                <div class="font-bold inline">{currentUser?.name}</div>
                <div class="text-gray-400">@{currentUser?.handle}</div>
              </div>
            </div>
            <span onClick={(e) => { e.stopPropagation(); signOut({callbackUrl: '/'})}} class="hover:bg-gray-100 cursor-pointer block border-t clear-both py-5 text-center p-8">
              Log Out @{currentUser?.handle}
            </span>
            <div
              style={{
                borderWidth: "10px",
                borderStyle: "solid",
                borderColor: "white transparent transparent transparent",
                filter: "drop-shadow(1px 4px 3px #ddd)",
              }}
              class="bg-transparent w-1 -bottom-5 absolute left-1/2 lg:left-5"></div>
          </div>
          <div
            onClick={e => showLogOut(e)}
            id="currentUser"
            class="mt-auto flex w-full lg:w-auto py-4 px-4.5 lg:p-1 hover:bg-yellow-100 rounded-full cursor-pointer">
            <img
              class="h-12 w-12 rounded-full inline float-left"
              src={currentUser?.image}
            />
            <div class="truncate max-w-85p inline float-left pl-3 lg:hidden">
              <div class="font-bold inline">{currentUser?.name}</div>
              <div class="text-gray-400">@{currentUser?.handle}</div>
            </div>
            <span class="inline-flex float-right place-content-center h-full lg:hidden">
              <Icon name='opts' />
            </span>
          </div>
        </div>
      </div>
    </>
  )

}


function SidebarItem ({href, icon, children}){
  let {pathname, query} = useRouter()
  query = query && Object.values(query).reduce((acc, cur) => {if (acc) return acc; return ('/' + cur) == href}, false)

  // const [isActive, setIsActive] = useState(pathname == href)
  // console.log({icon, pathname, query, href}, `/${query?.userID}` == href, pathname == href)
  // useLayoutEffect(()=> {
  //   ((`/${query?.userID}` == href) || (pathname == href))
  //     ? setIsActive(true)
  //     : setIsActive(false)
  // }, [pathname])


  const isActive = (pathname == href) || (query)


  return (
    <Link href={href} class='no-underline contents'>
      <span class="cursor-pointer group flex">
        <span
          class=" group block group-hover:bg-yellow-100 group-hover:content rounded-full p-3 pl-4 lg:pl-3">
          <Icon
            name={icon}
            options= {{
              width: "7",
              color: 'gray-800',
              activeColor: "yellow-500",
              topOrBottom: "middle",
            }}
            changeOnPath={href}
            />
          <span class={`align-middle font-bold text-xl ${isActive ? 'text-yellow-500' : 'text-gray-900'} px-5 group-hover:text-yellow-500 lg:hidden`}>
            {children}
          </span>
        </span>
      </span>
    </Link>
  )
}
