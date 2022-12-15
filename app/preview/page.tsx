import { Providers } from 'app/providers'
import MessageList from 'app/MessageList'
import HeartOutline from 'app/HeartOutline'

function PreviewPage() {
  return (
    <Providers session={''}>
      <main>
        <MessageList />
        <HeartOutline />
      </main>
    </Providers>
  )
}

export default PreviewPage
