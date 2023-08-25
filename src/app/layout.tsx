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
        <footer>
            <a className='link' href='https://github.com/KopyTKG/ED-materialConvertion' target='_blank'>
              GitHub Repository
            </a>
            <a className='link' href='https://github.com/KopyTKG/' target='_blank'>
              Maintainer: <b>KopyTKG</b>
            </a>
        </footer>
      </body>
    </html>
  )
}
