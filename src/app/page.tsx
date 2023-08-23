
export default function Home() {
  return (
    <main>
      <h1>Elite Dangerous Material Convertion Chart</h1>
      <a href="/raw">
        <div className="btn btn-secondary-outline">
          Raw Materials
        </div>
      </a>
      <a href="/manufactured">
        <div className="btn btn-secondary-outline">
          Manufactured Materials
        </div>
      </a>
      <a href="/encoded">
        <div className="btn btn-secondary-outline">
          Encoded Materials
        </div>
      </a>
    </main>
  )
}
