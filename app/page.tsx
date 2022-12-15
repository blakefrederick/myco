import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { unstable_getServerSession } from 'next-auth/next'
import HeartOutline from './HeartOutline'

async function HomePage() {
  // Doesn't contain my customer session vars so using useSession in ChatInput, MessageList instead of passing as prop
  const session = await unstable_getServerSession()

  return (
    <main>
      {session && <MessageList />}
      {session && <ChatInput />}
      <HeartOutline />
    </main>
  )
}

export default HomePage
