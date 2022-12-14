'use client'

import { Providers } from '../providers'
import MessageList from '../MessageList'
import { useRouter } from 'next/navigation'

function PreviewPage() {
  const router = useRouter()
  return (
    <Providers session={''}>
      <main>
        <MessageList />
        <h1 className="text-center" onClick={() => router.push('/about')}>
          &#9825;
        </h1>
      </main>
    </Providers>
  )
}

export default PreviewPage
