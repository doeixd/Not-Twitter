import { useRouter ***REMOVED*** from "next/router";
import useWindowSize from "../lib/useWindowSize";
import Icon from "./icons";
import CustomLink from "./Link";

export default function TabNav() {
  const {width: screenWidth***REMOVED*** = useWindowSize()
  
  

  if (screenWidth <= 812) {
    return (
      <div class='fixed bottom-0 w-screen flex bg-white h-13 items-stretch'>
        <TabItem iconName='house' href='/' />
        <TabItem iconName='search' href='/search' />
        <TabItem iconName='bell' href='/notifications' />
      </div>
    )
***REMOVED***

  return <></>

***REMOVED***


function TabItem ({iconName, href***REMOVED***) {
  return (
    <CustomLink href={href***REMOVED***>
      <span class='flex-grow flex-shrink grid place-items-center'>
        <Icon name={iconName***REMOVED*** changeOnPath={href***REMOVED*** options={{mdWidth: '6.5', color:'gray-500', activeColor: 'yellow-500'***REMOVED******REMOVED*** />
      </span>
    </CustomLink>
  )
***REMOVED***