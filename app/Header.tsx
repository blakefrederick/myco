import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoutButton from './LogoutButton'

function Header() {
  const session = true // debug
  
  if (session) return (
    <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
      <div className="flex space-x-2">
        <Image className="rounded-full mx-2 object-contain" src="https://yt3.ggpht.com/WHJZWMGMtYtfNCT6CBnleexvlO2oR-LfkofliI5P3FBx73x8LTr_KAqVZvKhbg2EaP97qLIzEJk=s88-c-k-c0x00ffffff-no-rj-mo" 
          alt='Profile Picture' height='55' width='55' />
        <div>
          <p className="text-blue-400">Logged in as:</p>
          <p className="font-bold text-lg">Blake Frederick</p>
        </div>
      </div>
      <LogoutButton />
    </header>
  )

  return (
    <header className="sticky top-0 z-50 bg-white justify-center items-center p-10 shadow-sm">
        <div className="flex flex-col items-center space-y-5">
            <div className="flex space-x-2 items center">
                <Image src="https://yt3.ggpht.com/WHJZWMGMtYtfNCT6CBnleexvlO2oR-LfkofliI5P3FBx73x8LTr_KAqVZvKhbg2EaP97qLIzEJk=s88-c-k-c0x00ffffff-no-rj-mo" alt='logo' height='36' width='36' />
                <p className="text-blue-400">Look it's Myco</p>
            </div>
            <Link href="/auth/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</Link>
        </div>
    </header>
  )
}

export default Header