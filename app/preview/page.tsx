import { Providers } from '../providers'
import MessageList from '../MessageList'

async function PreviewPage() {
  return (
    <Providers session={''}>
      <main>
        {<MessageList />}
        <h1 className="text-center">&#9825;</h1>
      </main>
    </Providers>
  )
}

export default PreviewPage
