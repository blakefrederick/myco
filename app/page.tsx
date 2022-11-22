import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { unstable_getServerSession } from 'next-auth/next'
import { Providers } from './providers'

async function HomePage() {
  // Doesn't contain my customer session vars so using useSession in ChatInput, MessageList instead of passing as prop
  const session = await unstable_getServerSession()

  return (
    <Providers session={session}>
      <main>
        {session && <MessageList />}
        {session && <ChatInput />}
        <h1 className="text-center">🎔</h1>
      </main>
    </Providers>
  )
}

export default HomePage
