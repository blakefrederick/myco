import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoutButton from './LogoutButton'
import { unstable_getServerSession } from 'next-auth'

async function Header() {
  const session = await unstable_getServerSession()
  const isGithub = session?.user?.image?.includes('github')
  const isFacebook = session?.user?.image?.includes('fbsbx')
  const isTwitter = session?.user?.image?.includes('twimg')

  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            src={session.user?.image!}
            alt="Profile Picture"
            height="55"
            width="55"
          />
          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
            <p
              className={`text-2xs px-[1px] pb-[1px] ${
                isFacebook && 'text-blue-300'
              } ${isGithub && 'text-gray-300'}`}
            >
              {isFacebook && 'Signed in with Facebook'}
              {isGithub && 'Signed in with Github'}
            </p>
          </div>
        </div>
        <LogoutButton />
      </header>
    )

  return (
    <header className="sticky top-0 z-50 bg-white justify-center items-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items center">
          <Image
            src="https://i.shgcdn.com/4a3ef1db-194d-4444-b1cf-ecc4e980a86c/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
            alt="logo"
            height="600"
            width="600"
          />
        </div>
        <p className="text-gray-600">It's Myco</p>
        <Link
          href="/auth/signin"
          className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
      </div>
    </header>
  )
}

export default Header
