import React from 'react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { Message } from '../typings'

async function HomePage() {
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then(
    (res) => res.json()
  )

  const messages: Message[] = data.messages

  console.log(data)
  return (
    <main>
      <MessageList initialMessages={messages} />
      <ChatInput />
      <h1 className="text-center">🎔</h1>
    </main>
  )
}

export default HomePage
