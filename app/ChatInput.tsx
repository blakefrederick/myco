'use client'

import { FormEvent, useState} from 'react'

function ChatInput() {
    const [input, setInput] = useState('')

    const addMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

  return (
    <form
        onSubmit={e => addMessage} 
        className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100">
        <input 
            type="input" 
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