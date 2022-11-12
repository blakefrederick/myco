'use client'

import React, { useState } from 'react'

function LogoutButton() {
    const [buttonText, setButtonText] = useState('Logout')
  return (
    <button onClick={() => setButtonText('No')} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {buttonText}
    </button>
  )
}

export default LogoutButton