import { useRouter } from 'next/router'
import { useStore } from '../../lib/store'
import Icon from '../../components/icons'
import { useState } from 'react'
import { getTrendsFromTwitter } from '../../lib/getTrendsFromTwitter'
import Link from '../../components/Link'
import { getSearchResults } from '../../lib/queryHooks.js'

export default function TagPage({trends}) {
  const router = useRouter()
  const {query: {query} } = router

  const lastPage = useStore(state => state.lastPage)


  return (<>
      <div>
        <div className='flex flex-wrap items-center py-3 pl-5 self-start sticky top-0 z-10 bg-white'>
          <span className='hover:bg-yellow-100 rounded-full p-1 relative transition-all content'>
            <svg onClick={()=> router.push(lastPage, undefined, {shallow: true})} viewBox="0 0 24 24" className="inline stroke-0 cursor-pointer w-8 text-yellow-500 fill-current"><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>
          </span>
          <div className='-ml-7 px-12 flex flex-grow'>
            <span className='py-1.5 px-2.5 flex-grow rounded-full outline-none group focus-within:ring-1 focus-within:text-yellow-500 text-gray-400 focus-within:ring-yellow-500 transition-all space-x-4 bg-gray-100 focus-within:bg-white'>
              <Icon name='search' options={{topOrBottom: 'top', color: '', hoverColor:''}} />
              <input className='pl-2.5 outline-none focus:text-gray-800 bg-transparent placeholder-gray-400' placeholder='Search'></input>
            </span>
          </div>
          </div>
        <div class='font-bold text-gray-800 p-3.5 text-xl border-b-3 border-yellow-500'>
          Trending
        </div>
      </div>
    { !trends
      ? <div>Nothing for you to explore right now</div>
      : trends.map(trend => <Trend {...trend} />)
    }
  </>)

}

function Trend ({category, name, engagement}) {
  const router = useRouter()

  const search = _ => {
    router.push({
      pathname: '/search/[query]',
      query: {
        query: name
      }
    })
  }

  return (
    <div onClick={_ => search()} class='p-3.5 space-y-0.5 hover:bg-gray-100 cursor-pointer'>
      <div class='text-sm text-gray-500'>{category}</div>
      <div class='font-bold text-gray-800'>{name}</div>
      {engagement && (<div class='text-sm text-gray-400'>{engagement}</div>)}
    </div>
  )
}

export async function getStaticProps() {
  const trends = await getTrendsFromTwitter() ?? {}
  return {
    props:{ trends },
    revalidate: 600
  }
}
