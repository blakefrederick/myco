import React from 'react'

function ChatInput() {
  return (
    <form>
        <input type="input"></input>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        type="submit">Send</button>
    </form>
  )
}

export default ChatInput