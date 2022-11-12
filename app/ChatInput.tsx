'use client'

import { FormEvent, useState} from 'react'
import { v4 as uuid } from 'uuid'
import { Message } from '../typings'

function ChatInput() {
    const [input, setInput] = useState('')

    const addMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!input) return

        const messageToSend = input
        setInput('')

        const id = uuid()

        const message: Message = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: 'Blake Frederick',
            profilePic: 'https://yt3.ggpht.com/WHJZWMGMtYtfNCT6CBnleexvlO2oR-LfkofliI5P3FBx73x8LTr_KAqVZvKhbg2EaP97qLIzEJk=s88-c-k-c0x00ffffff-no-rj-mo',
            email: 'email@blake.ca',
        }

        const uploadMessageToUpstash = async () => {
            const res = await fetch('/api/addMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message
                }),
            })

            const data = await res.json()
        }

    }

  return (
    <form
        onSubmit={addMessage} 
        className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100">
        <input 
            type="input" 
            value={input}
            placeholder="What's happening?" 
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 diabled:cursor-not-allowed"></input>
        <button 
            type="submit" 
            disabled={!input}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed" 
        >
            Send</button>
    </form>
  )
}

export default ChatInput