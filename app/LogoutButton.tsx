'use client'

import React, { useState } from 'react'
import { signOut } from 'next-auth/react'

function LogoutButton() {
  const [buttonText, setButtonText] = useState('Logout')

  const processSignOut = () => {
    if (buttonText !== 'No') {
      setButtonText('No')
    } else {
      setButtonText('Okay! Signed Out!')
      signOut()
    }
  }
  return (
    <button
      onClick={() => processSignOut()}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {buttonText}
    </button>
  )
}

export default LogoutButton
