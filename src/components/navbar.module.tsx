
export default function Navbar() {
    return (
        <nav className="navbar">
            <a href="/" className="navbar-brand">
                <div className="navbar-home"/>
                Home
            </a>
            <a href="/raw" className="navbar-brand">
                <div className="navbar-raw"/>
                Raw
            </a>
            <a href="/manufactured" className="navbar-brand">
                <div className="navbar-manufactured"/>
                Manufactured
            </a>
            <a href="/encoded" className="navbar-brand">
                <div className="navbar-encoded"/>
                Encoded
            </a>
        </nav>
    )
}