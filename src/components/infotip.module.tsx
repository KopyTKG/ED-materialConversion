
export default function Infotip(props: any) {
    const type: string = props.type? props.type: ""
    return (
        <div className="infotip">
            {props.children}
            <div className={"infotip-modal "+ 
                (type == "primary"? "tt-primary": 
                type == "danger"? "tt-error":
                type == "warning"? "tt-warning":
                type == "success"? "tt-success": "tt-secondary")
            }>
                <div className="infotip-title">
                    {props.title}
                </div>
                <span>grade: <span className="highlight">{props.grade}</span></span>
                <span>max amount: <span className="highlight">{props.max}</span></span>
                <a href={"https://inara.cz/elite/component/"+ props.id} className="infotip-link" target="_blank"> Locate on Inara.cz </a>
            </div>
        </div>
    )
}