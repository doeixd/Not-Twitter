import Link from 'next/link'

const links = [
  { href: 'https://github.com/vercel/next.js', label: 'GitHub' ***REMOVED***,
  { href: 'https://nextjs.org/docs', label: 'Docs' ***REMOVED***,
]

export default function Nav() {
  return (
    <nav>
      <ul className="flex items-center justify-between p-8">
        <li>
          <Link href="/">
            <a className="text-blue-500 no-underline text-accent-1 dark:text-blue-300">
              Home
            </a>
          </Link>
        </li>
        <ul className="flex items-center justify-between space-x-4">
          {links.map(({ href, label ***REMOVED***) => (
            <li key={`${href***REMOVED***${label***REMOVED***`***REMOVED***>
              <a href={href***REMOVED*** className="no-underline btn-blue">
                {label***REMOVED***
              </a>
            </li>
          ))***REMOVED***
        </ul>
      </ul>
    </nav>
  )
***REMOVED***
