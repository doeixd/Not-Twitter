import { getNotifications, getUser ***REMOVED*** from "../lib/queryHooks";
import Icon from '../components/icons'
import ProfileLink from '../components/ProfileLink'
import CustomLink from "../components/Link";

export default function notifications () {
  const {data: notifications, isLoading, error***REMOVED*** = getNotifications()

  if (isLoading) return (<p>Loading...</p>)
  return ( <>
    <h1 class='font-bold text-xl px-5 py-3.5 bg-white sticky top-0'>
      Notifications
    </h1>
    {
      notifications.map(n => {
        return <Notification {...n***REMOVED*** />
    ***REMOVED***)
  ***REMOVED***
  </>)
***REMOVED***


function Notification({action, actorID, objectID***REMOVED***) {
  const {data: userData, isLoading, error***REMOVED*** = getUser(actorID)
  if (isLoading) return <p>Loading...</p>
  const href = ['mention', 'follow'].includes(action) ? `/${actorID***REMOVED***` : `/posts/${objectID***REMOVED***`
  return (
    <CustomLink href={href***REMOVED*** class='no-underline hover:bg-gray-100 block'>
      <div class='flex gap-7 p-5 items-center '>
        <div class=' pl-3'>
          <ActionIcon action={action***REMOVED*** />
        </div>
        <div class=' pl-0.5'>
          <img src={userData.image***REMOVED*** class='w-10 object-cover rounded-full inline mr-3.5' />
          <ActionText action={action***REMOVED*** userData={userData***REMOVED*** />
        </div>
      </div>
    </CustomLink>
  )
***REMOVED***


function ActionIcon({ action ***REMOVED***) {
  const match = {
    follow: <Icon name='personFilled' options={{color: 'blue-400', width: '8'***REMOVED******REMOVED*** />,
    like: <Icon name='heartFilled' options={{color:'red-500', width:'8'***REMOVED******REMOVED***/>,
    reply: <Icon name='commentFilled' options={{color:'indigo-500', width: '8'***REMOVED******REMOVED*** />,
    quote: <Icon name='repostFilled' options={{color:'green-400', width: '8'***REMOVED******REMOVED*** />,
    mention: <Icon name='at' options={{color:'pink-500', width: '8'***REMOVED******REMOVED*** />,
***REMOVED***

  return match[action]
***REMOVED***


function ActionText({action, userData:{name, _id***REMOVED******REMOVED***) {
  const match = {
    follow: `followed you`,
    like: `liked your post`,
    reply: 'replied to your post',
    quote: 'quoted you',
    mention: 'mentioned you',
***REMOVED***
  return ( 
    <span>
        <ProfileLink id={_id***REMOVED***>
          <span class='font-bold hover:underline'>
            {name***REMOVED***
          </span>
        </ProfileLink>
        {` ${match[action]***REMOVED***`***REMOVED***
    </span>
  )
***REMOVED***
