export default function Tooltip(props: any) {

    return (
        <div className="tooltip">
            {props.children}
            <div className={"tooltip-modal "} id={props.props.id+"-tooltip"}>
                <div className="tooltip-title">
                </div>
            </div>
        </div>
    )
}