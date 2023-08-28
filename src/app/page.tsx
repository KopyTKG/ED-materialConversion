
export default function Home() {
  return (
    <div className="main">
      <div className="main-title">
        Elite Dangerous:  Material Conversion (EDMC)
      </div>

      <div className="main-menu">
        <a href="/raw" className="menu-btn">
            Raw Materials
          
        </a>
        <a href="/manufactured" className="menu-btn">
            Manufactured Materials
        </a>
        <a href="/encoded" className="menu-btn">
            Encoded<br/>Materials
        </a>
      </div>
    </div>
  )
}
