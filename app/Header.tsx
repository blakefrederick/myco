'use client'

import Link from 'next/link'
import Image from 'next/image'
import LogoutButton from './LogoutButton'
import { unstable_getServerSession } from 'next-auth'
import { usePathname } from 'next/navigation'
import { getCookie } from 'cookies-next'

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>
}

function Header({ session }: Props) {
  const isGithub = session?.user?.image?.includes('github')
  const isTwitter = session?.user?.image?.includes('twimg')
  const pathname = usePathname()
  const service = getCookie('service')
  const isSpotify = service === 'spotify'
  const isFacebook = session?.user?.image?.includes('fbsbx') && !isSpotify

  if (pathname?.split('/')[1] === 'preview')
    return (
      <header className="sticky top-0 z-50 p-10 bg-white flex justify-between items-center">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            src="https://pbs.twimg.com/media/CLI0Kd5UcAAkpiM?format=png&name=small"
            alt="Profile Picture"
            height="65"
            width="65"
          />
          <div>
            <p className="text-blue-400">Not logged in</p>
            <p className="font-bold text-lg">Anonymous</p>
            <p className={`text-2xs px-[1px] pb-[1px]`}>That's okay!</p>
          </div>
        </div>
      </header>
    )

  if (session)
    return (
      <header className="sticky top-0 z-50 p-10 bg-white flex justify-between items-center">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            src={session.user?.image!}
            alt="Profile Picture"
            height="65"
            width="65"
          />
          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
            <p
              className={`text-2xs px-[1px] pb-[1px] ${
                isFacebook && 'text-Facebook'
              } ${isGithub && 'text-GitHub'} ${isTwitter && 'text-Twitter'} ${
                isSpotify && 'text-Spotify'
              }`}
            >
              {isFacebook && 'Signed in with Facebook'}
              {isGithub && 'Signed in with Github'}
              {isTwitter && 'Signed in with Twitter'}
              {isSpotify && 'Signed in with Spotify'}
            </p>
          </div>
        </div>
        <LogoutButton />
      </header>
    )

  return (
    <header className="top-0 z-50 bg-white justify-center items-center">
      <div className="flex flex-col items-center space-y-5 mb-10">
        <div className="flex space-x-2 items center">
          <Link href="/">
            <Image
              src="https://i.shgcdn.com/4a3ef1db-194d-4444-b1cf-ecc4e980a86c/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
              alt="logo"
              height="600"
              width="600"
            />
          </Link>
        </div>
        <p className="text-gray-600">It's Myco</p>
        <Link
          href="/auth/signin"
          className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
        <Link href="/preview" className="text-gray-300 text-sm underline">
          or not
        </Link>
        <Link href="/auth/signin?dev=true" className="text-gray-100 text-3xs">
          secret developer link
        </Link>
      </div>
    </header>
  )
}

export default Header
