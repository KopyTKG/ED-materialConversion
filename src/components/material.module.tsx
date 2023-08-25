import Infotip from "./infotip.module"

export default function Slot(props: any) {
    const selected = props.amount
    
    const svgs = [
        "/Grade-1.svg",
        "/Grade-2.svg",
        "/Grade-3.svg",
        "/Grade-4.svg",
        "/Grade-5.svg"
    ]

    const Lower  = () => {
        if (selected > 1) {
            props.setAmount(selected - 1)
        } 
    }
    const Upper = () => {
        if (selected < props.max) {
            props.setAmount(selected + 1)
        }
    }

    const Click = (event: any) => {
        let id : any= event.target.id
        if (id.includes("-")) {
            id = id.split("-")[0]
        } else {
            id = id
        }
        props.setCurrent(id.toString())
    }


    return (
        <div className="mt" id={props.id} onClick={event => Click(event)}>
            <div className="mt-box" id={props.id+"-box"}>
                <div className="mt-top" id={props.id+"-top"}>
                    <div className="mt-max number">
                        <span id={props.id+"-max"}>{props.max}</span>
                    </div>
                    <Infotip title={props.children} grade={props.grade} max={props.max} id={props.matId}>
                        <div className="mt-info"/>
                    </Infotip>
                </div>
                <div className="mt-grade"  id={props.id+"-grade"}
                style={
                    {
                        WebkitMask: `url(${svgs[props.svg]}) no-repeat center / contain`,
                        maskImage: `url(${svgs[props.svg]}) no-repeat center / contain`
                    }
                }/>

                <div className="mt-text" id={props.id+"-text"}>
                    {props.children}
                </div>
            </div>
            <div className="mt-modal" id={props.id+"-modal"} style={{display: "none"}}>
                <div className="mt-button" id={props.id+"-minus"} onClick={Lower}/>
                <div className="mt-convert" id={props.id+"-convert"}/>
                <div className="mt-button" id={props.id+"-plus"} onClick={Upper}/>
                
            </div>
        </div>
    )
}
