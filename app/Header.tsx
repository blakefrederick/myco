import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Header() {
  return (
    <header>
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