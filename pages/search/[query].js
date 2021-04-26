import { useRouter } from 'next/router'
import { useStore } from '../../lib/store'
import Icon from '../../components/icons'
import { useState } from 'react'
import { getSearchResults } from '../../lib/queryHooks'
import Post from '../../components/Post'
import { useQueryClient } from 'react-query'

export default function Search() {
  const router = useRouter()
  const {query: {query} } = router
  const [activeTab, setActiveTab] = useState('top')
  const lastPage = useStore(state => state.lastPage)

  const {isLoading, error} = getSearchResults(query)
  const queryClient = useQueryClient()

  if (isLoading) return <></>
    const { data } = queryClient.getQueryState(['search', query, activeTab])
  console.log({data})
  return (<>
      <div><div className='flex flex-wrap items-center py-3 pl-5 self-start sticky top-0 z-10 bg-white'>
        <span className='hover:bg-yellow-100 rounded-full p-1 relative transition-all content'>
          <svg onClick={()=> router.push(lastPage, undefined,{shallow: true})} viewBox="0 0 24 24" className="inline stroke-0 cursor-pointer w-8 text-yellow-500 fill-current"><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>
        </span>
        <div className='-ml-7 px-12 flex flex-grow'>
          <span className='py-1.5 px-2.5 flex-grow rounded-full outline-none group focus-within:ring-1 focus-within:text-yellow-500 text-gray-400 focus-within:ring-yellow-500 transition-all space-x-4 bg-gray-100 focus-within:bg-white'>
            <Icon name='search' options={{topOrBottom: 'top', color: '', hoverColor:''}} />
            <input className='pl-2.5 outline-none focus:text-gray-800 bg-transparent placeholder-gray-400' placeholder={query ?? 'Search'} onFocus={(e) => {e.target.value = e.target.value || query}}></input>
          </span>
        </div>
        </div>
        <div className='flex flex-row text-center justify-evenly pt-8 border-b border-gray-200 '>
          <div onClick={() => setActiveTab('top')} className={`flex-grow py-4 text-${activeTab == 'top' ? 'yellow' : 'gray'}-500 font-black text-lg hover:bg-yellow-100 hover:text-yellow-500 cursor-pointer ${(activeTab == 'top') && 'border-b-4 border-yellow-500'}`}>Top</div>
          <div onClick={() => setActiveTab('latest')} className={`flex-grow py-4 text-${activeTab == 'latest' ? 'yellow' : 'gray'}-500 font-black text-lg hover:bg-yellow-100 hover:text-yellow-500 cursor-pointer ${(activeTab == 'latest') && 'border-b-4 border-yellow-500'}`}>Latest</div>
          <div onClick={() => setActiveTab('people')} className={`flex-grow py-4 text-${activeTab == 'people' ? 'yellow' : 'gray'}-500 font-black text-lg hover:bg-yellow-100 hover:text-yellow-500 cursor-pointer ${(activeTab == 'people') && 'border-b-4 border-yellow-500'}`}>People</div>
        </div>
      </div>
      <div>
    {data?.length
      ? data?.map(post => <Post id={post._id} />)
      : <div class='p-5 text-lg font-bold bg-gray-100 justify-center flex gap-3'><Icon name='exclamation' options={{width: 6, color: 'gray-800'}}/> No Results Found</div>
    }
      </div>
    <div>
    </div>
    {
    }
  </>)

}
