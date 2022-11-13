import React from 'react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

function HomePage() {
  return (
    <main>
      <MessageList />
      <ChatInput />
      <h1 className="text-center">🎔</h1>
    </main>
  )
}

export default HomePage
