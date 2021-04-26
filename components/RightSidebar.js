import { useRouter ***REMOVED*** from 'next/router'
import Icon from './icons'
import { getTrendsFromTwitter ***REMOVED*** from '../lib/queryHooks'

export default function RightSidebar({trends***REMOVED***) {
  const {pathname***REMOVED*** = useRouter()


  return (<>
    <div style={{width: 351***REMOVED******REMOVED*** class='sticky top-0 h-screen gap-5 flex flex-col flex-shrink flex-grow pt-2.5 items-center md:hidden px-5 max-w-415 border-l'>
      { (!pathname.match('search'))
        ? (<div className='inline-flex w-full py-3 px-2.5 mx-5 rounded-full outline-none group focus-within:ring-1 focus-within:text-yellow-500 text-gray-400 focus-within:ring-yellow-500 transition-all bg-gray-100 focus-within:bg-white'>
            <Icon name='search' options={{width:'6', topOrBottom: 'middle', color: '', hoverColor:''***REMOVED******REMOVED*** />
            <input className='pl-2.5 m-0 outline-none focus:text-gray-800 bg-transparent placeholder-gray-400' placeholder='Search'></input>
          </div>)
        : ('')
    ***REMOVED***
      <WhoToFollow />
      <WhatsHappening />
    </div>
  </>)
***REMOVED***


function Trend ({category, name, engagement, className***REMOVED***) {
  const router = useRouter()

  const search = _ => {
    router.push({
      pathname: '/search/[query]',
      query: {
        query: name
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

  return (
    <div onClick={_ => search()***REMOVED*** class={'p-3.5 space-y-0.5 hover:bg-gray-100 cursor-pointer' + ` ${className ?? ' '***REMOVED***`***REMOVED***>
      <div class='text-sm text-gray-500 opacity-75'>{category***REMOVED***</div>
      <div class='font-bold text-gray-800'>{name***REMOVED***</div>
      {engagement && (<div class='text-sm text-gray-400 opacity-75'>{engagement***REMOVED***</div>)***REMOVED***
    </div>
  )
***REMOVED***


function WhatsHappening () {
  const {error, data: trends, isLoading***REMOVED*** =  getTrendsFromTwitter()
  const placeholder = (<div class='p-6 text-gray-400 text-center font-bold'>Nothing to explore right now</div>)
  const content = (
    (!trends || isLoading || error)
      ? placeholder
      : trends.slice(0,4).map(trend => <Trend {...trend***REMOVED*** key={trend.name***REMOVED*** className='pl-6 hover:bg-gray-150 last:pb-4 last:rounded-b-3xl'/>)
  )
  console.log({content***REMOVED***)
  return (
    <div class='bg-opacity-75 rounded-3xl bg-gray-100 pt-3.5 w-full divide-y divide-opacity-75 '>
      <h3 class='text-xl text-gray-700 font-bold pb-2.5 px-6 '>
        What's Happening
      </h3>
        { content ***REMOVED***
    </div>
  )
***REMOVED***

// TODO
function WhoToFollow () {
  return (
    <div class='bg-opacity-75 rounded-3xl bg-gray-100 py-3.5 w-full divide-y divide-opacity-75'>
      <h3 class='text-xl text-gray-700 font-bold pb-2.5 px-6'>
      Who To Follow
      </h3>
      <p>MEE</p>
    </div>
  )
***REMOVED***
