'use client'
import { useState } from "react"
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript"

function Element(id: string, content: string, display: string, outline: string) {
    let modalId = id+"-modal"
    let convertId = id+"-convert"
    
    let modal :any = document.getElementById(modalId)
    let convert: any = document.getElementById(convertId)
    let element :any = document.getElementById(id);

    convert.innerHTML = content;
    modal.style.display = display;
    element.style.outline = outline;
}

function LoopElements(width: number, height: number, content: string, display: string, outline: string) {
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            let newId = x+""+y;
            Element(newId, content, display, outline)
        }
    }
}

function GenerateContent(ratio: number, amount: number): string {
    return `${ratio} -> <span style='color: blue;background-color: transparent';'>${amount}</span> `
}


export default function Slot(props: any) {
    const [selected, setAmount] = useState(1)

    const setContent = (id: string) => {
        const width = props.w;
        const height = props.h
        // Clean board
        LoopElements(width, height, "", "none", "none")

        // Clicked Element
        let outline: string = ".5rem solid blue";
        let display: string = "flex"
        Element(id, "", "none", outline)
        
        // Calculations
        for (let x = 0; x < height; x++) {
            for (let y = 0; y < width; y++) {                
                let newId = x+""+y
                if (id === newId) continue;

                let xId = parseInt(id[0]);
                let yId = parseInt(id[1]);
                let ratio = 1
                let amount = 1
                let side :string = ""

                if (x == xId) {
                    if (y < yId ) {
                        ratio = (Math.pow(6, yId-y)) * selected
                        amount = selected

                    }
                    if (y > yId) {
                        amount = Math.pow(3, y - yId)
                        let tmp = amount
                        while (amount < selected) {
                            amount += tmp
                            ratio += 1 
                        } 

                    }
                }
                else {
                    
                    if (y < yId) {
                        ratio = (Math.pow(6, (yId-(y-1)))) * selected
                        amount = selected

                    }
                    else if (y > yId) {
                        amount = Math.pow(3, (y-1) - yId ) * selected
                        ratio = 2 * selected


                    } else {
                        ratio = 6 * selected
                        amount = selected
                    }
                }
                let content = GenerateContent(ratio, amount)
                Element(newId, content, display, "none")
                
            }
        }
    }
    const svgs = [
        "/Grade-1.svg",
        "/Grade-2.svg",
        "/Grade-3.svg",
        "/Grade-4.svg",
        "/Grade-5.svg"
    ]
    let id = props.id
    return (
        <div className="mt" id={props.id} onClick={() => setContent(id)}>
            <div className="mt-box">
                <div className="mt-grade" 
                style={
                    {
                        WebkitMask: `url(${svgs[props.svg]}) no-repeat center / contain`,
                        maskImage: `url(${svgs[props.svg]}) no-repeat center / contain`
                    }
                }/>

                <div className="mt-text">
                    {props.children}
                </div>
            </div>
            <div className="mt-box mt-modal" id={props.id+"-modal"} style={{display: "none"}}>
                <div className="mt-convert" id={props.id+"-convert"}/>
            </div>
        </div>
    )
}

// <img src={svgs[props.svg]} alt="grade" className="mt-grade"/>