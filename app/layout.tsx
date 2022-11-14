import Header from './Header'
import '../styles/globals.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
