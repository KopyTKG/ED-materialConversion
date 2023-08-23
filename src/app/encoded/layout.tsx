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
          <a href="/manufactured">
            <div className='btn btn-secondary-outline'>
            Manufactured
            </div>
          </a>
        </nav>
        <main>
          {children}
        </main>
    </>
  )
}
