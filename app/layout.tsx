import Header from './Header'
import 'styles/globals.css'
import { Providers } from './providers'
import { unstable_getServerSession } from 'next-auth/next'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await unstable_getServerSession()

  return (
    <html>
      <head />
      <body>
        <Providers session={session}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
