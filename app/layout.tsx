import './globals.css'

export const metadata = {
  title: 'Resume AI',
  description: 'AI Resume Builder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
