import React from 'react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { Message } from '../typings'
import { unstable_getServerSession } from 'next-auth/next'
import { Providers } from './providers'

async function HomePage() {
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then(
    (res) => res.json()
  )

  const messages: Message[] = data.messages // this and fetch unused because it's not passed to MessageList
  const session = await unstable_getServerSession()
  console.log('session', session)

  return (
    <Providers session={session}>
      <main>
        {session && <MessageList />}
        {session && <ChatInput session={session} />}
        <h1 className="text-center">🎔</h1>
      </main>
    </Providers>
  )
}

export default HomePage
