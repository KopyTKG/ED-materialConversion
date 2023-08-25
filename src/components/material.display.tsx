'use client'
import { useState, useEffect, useRef } from "react"
import Slot from "@/components/material.module"

import Common from "@/store/common.json"


function Element(id: string, content: string, display: string, outline: string, type: string) {
    try {
        let modalId = id+"-modal"
        let convertId = id+"-convert"
        
        let modal :any = document.getElementById(modalId)
        let convert: any = document.getElementById(convertId)
        let element :any = document.getElementById(id);
        let tooltip :any = document.getElementById(id+"-tooltip")
        
        modal.style.display = display;
        convert.innerHTML = content;
        element.style.outline = outline;
        if (type == "blue") {
            modal.classList.add("mt-blue")
            tooltip.classList.remove("tt-secondary")
            tooltip.classList.add("tt-primary")
        } else if (type == "orange") {
            modal.classList.add("mt-orange")
            tooltip.classList.remove("tt-secondary")
            tooltip.classList.add("tt-success")
        } else if (type == "gray") {
            modal.classList.add("mt-gray")
            tooltip.classList.remove("tt-secondary")
            tooltip.classList.add("tt-error")
        } else {
            try {
                modal.classList.remove("mt-blue")
                modal.classList.remove("mt-orange")
                modal.classList.remove("mt-gray")
                tooltip.classList.remove("tt-primary")
                tooltip.classList.remove("tt-success")
                tooltip.classList.remove("tt-error")
                tooltip.classList.add("tt-secondary")
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

function LoopElements(width: number, height: number, content: string, display: string, outline: string) {
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            let newId = x+""+y;
            Element(newId, content, display, outline, "")
        }
    }
}

function GenerateContent(ratio: number, amount: number, id: string): string {
    return `${ratio} -> <span style='color: blue;background-color: transparent';' id=${id+"-highlight"}>${amount}</span>`
}

function getRandomItem(arr: any): string {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    // get random item
    const item = arr[randomIndex];
    return item;
}

export default function MaterialDisplay(props: any) {
    const [amount, setAmount] = useState(1)
    const [current, setCurrent] = useState("")
    const BG = useRef<HTMLDivElement>(null)

    const width = props.Mat.materials[0].length;
    const height = props.Mat.materials.length

    const setContent = () => {
        if (current == "" || current == "999"){
            // Clean board
            LoopElements(width, height, "", "none", "none")
        }
        else {
            // Clean board
            LoopElements(width, height, "", "none", "none")
            

            // Clicked Element
            let outline: string = ".5rem solid blue";
            let display: string = "grid"

            Element(current, amount.toString(), display, outline, "blue")
            let minus : any = document.getElementById(current+"-minus")
            minus.innerHTML = "-"
            let plus :any = document.getElementById(current+"-plus")
            plus.innerHTML = "+"

            console.log(current)
            // Calculations
            for (let x = 0; x < height; x++) {
                for (let y = 0; y < width; y++) {   

                    let newId = x+""+y
                    if (current == newId) continue;
                    let xId = parseInt(current[0]);
                    let yId = parseInt(current[1]);
                    let ratio = 1
                    let am = 1

                    if (x == xId) {
                        if (y < yId ) {
                            ratio = (Math.pow(6, yId-y)) * amount
                            am = amount

                        }
                        if (y > yId) {
                            am = Math.pow(3, y - yId)
                            let tmp = am
                            while (am < amount) {
                                am += tmp
                                ratio += 1 
                            } 

                        }
                    }
                    else {

                        if (y < yId) {
                            ratio = (Math.pow(6, (yId-(y-1)))) * amount
                            am = amount

                        }
                        else if (y > yId) {
                            am = Math.pow(3, (y-1) - yId ) * amount
                            ratio = 2 * amount


                        } else {
                            ratio = 6 * amount
                            am = amount
                        }
                    }
                    let content = GenerateContent(ratio, am, newId)
                    let max: any = document.getElementById(newId+"-max")?.innerHTML
                    let color = "orange"
                    if (ratio > max) color = "gray"
                    Element(newId, content, display, "none", color)

                }
            }
        }

    }


    

    const Clear = (event : any) => {
        if (event.target == BG.current) {
            setCurrent("999")
            setAmount(1)
            setContent()
        }
    }

    
    useEffect(() => {
        setContent() 
    }, [amount, current])

    return (
        <div ref={BG} onClick={Clear} className="mt-container">
                {props.Mat.materials.map((row: any, xId: any) => (
                    <div className="mt-row">
                        <div className="mt-cat">
                            <div className="title">{props.Mat.categories[xId]}</div>
                            <div className="line"/>
                        </div>
                        <div className="mt-content">
                        {row.map((col: any, yId: any) => (
                                <Slot 
                                    svg={yId} 
                                    id={xId+""+yId} 
                                    w={width} 
                                    h={height} 
                                    max={props.Mat.max[yId]}
                                    amount={amount}
                                    setAmount={setAmount}
                                    current={current}
                                    setCurrent={setCurrent}
                                    grade={Common.grades[yId]}
                                    matId={props.Mat.ids[xId][yId]}
                                >
                                    {col}
                                </Slot>

                        ))}
                        </div>
                    </div>
                ))}
            </div>
    )
}