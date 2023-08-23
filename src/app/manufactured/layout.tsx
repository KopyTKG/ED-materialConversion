
export default function SubLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <nav>
          <a href="/">
            <div className='btn btn-secondary-outline'>
              Home
            </div>
          </a>
          <a href="/raw">
            <div className='btn btn-secondary-outline'>
              Raw
            </div>
          </a>
          <a href="/encoded">
            <div className='btn btn-secondary-outline'>
              Encoded
            </div>
          </a>
        </nav>
        <main>
          {children}
        </main>
    </>
  )
}