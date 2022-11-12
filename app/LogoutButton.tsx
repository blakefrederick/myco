import React from 'react'
import Link from 'next/link'

function LogoutButton() {
  return (
    <Link href="/auth/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</Link>
  )
}

export default LogoutButton