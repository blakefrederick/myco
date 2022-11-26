'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ session, children }: any) {
  return (
    <SessionProvider
      session={session}
      // Re-fetch session every 1 second
      refetchInterval={1}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  )
}
