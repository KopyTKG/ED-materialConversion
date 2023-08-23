import '../sass/index.scss'


export const metadata = {
  title: 'EDMC',
  description: 'Elite Dangerous Materials Convertion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
