import Post from "./Post";
import useStore from "../lib/store"
import { useQuery } from "react-query"
import axios from 'axios'

export default function Feed(cool) {

  const {data, isLoading, error }= useQuery('feed', async () => {const { data } = await axios.get('/api/feed'); return data})

  if (isLoading) return 'Loading'
  if (data.length == 0) return  <div class='py-12 text-xl text-center bg-gray-100'>Nothing to see here... Try following someone?</div>
  return (
    <>
      {
        data?.map(post => <Post key={post} id={post} />)
      }
    </>
  )
}
