import { getNotifications, getUser } from "../lib/queryHooks";
import Icon from '../components/icons'
import ProfileLink from '../components/ProfileLink'
import CustomLink from "../components/Link";

export default function notifications () {
  const {data: notifications, isLoading, error} = getNotifications()

  if (isLoading) return (<p>Loading...</p>)
  return ( <>
    <h1 class='font-bold text-xl px-5 py-3.5 bg-white sticky top-0'>
      Notifications
    </h1>
    {
      notifications.map(n => {
        return <Notification {...n} />
      })
    }
  </>)
}


function Notification({action, actorID, objectID}) {
  const {data: userData, isLoading, error} = getUser(actorID)
  if (isLoading) return <p>Loading...</p>
  const href = ['mention', 'follow'].includes(action) ? `/${actorID}` : `/posts/${objectID}`
  return (
    <CustomLink href={href} class='no-underline hover:bg-gray-100 block'>
      <div class='flex gap-7 p-5 items-center '>
        <div class=' pl-3'>
          <ActionIcon action={action} />
        </div>
        <div class=' pl-0.5'>
          <img src={userData.image} class='w-10 object-cover rounded-full inline mr-3.5' />
          <ActionText action={action} userData={userData} />
        </div>
      </div>
    </CustomLink>
  )
}


function ActionIcon({ action }) {
  const match = {
    follow: <Icon name='personFilled' options={{color: 'blue-400', width: '8'}} />,
    like: <Icon name='heartFilled' options={{color:'red-500', width:'8'}}/>,
    reply: <Icon name='commentFilled' options={{color:'indigo-500', width: '8'}} />,
    quote: <Icon name='repostFilled' options={{color:'green-400', width: '8'}} />,
    mention: <Icon name='at' options={{color:'pink-500', width: '8'}} />,
  }

  return match[action]
}


function ActionText({action, userData:{name, _id}}) {
  const match = {
    follow: `followed you`,
    like: `liked your post`,
    reply: 'replied to your post',
    quote: 'quoted you',
    mention: 'mentioned you',
  }
  return ( 
    <span>
        <ProfileLink id={_id}>
          <span class='font-bold hover:underline'>
            {name}
          </span>
        </ProfileLink>
        {` ${match[action]}`}
    </span>
  )
}
