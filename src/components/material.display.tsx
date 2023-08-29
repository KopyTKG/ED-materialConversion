'use client'
import { useState, useEffect, useRef } from "react"
import Slot from "@/components/material.module"
import Common from "@/store/common.json"


// Classes
const tooltipClasses = [
    "tt-primary",
    "tt-success",
    "tt-error",
    "tt-secondary"
]
const modalClasses = [
    "mt-blue",
    "mt-orange",
    "mt-gray",
]

function Element(id: string, content: string, display: string, outline: string, type: string) {
    // Ids creation
    let modalId = id+"-modal"
    let convertId = id+"-convert"
    let tooltipId = id+"-tooltip"

    // Selecting elements to be modified
    let element :any = document.getElementById(id);
    let modal :any = document.getElementById(modalId)
    let convert: any = document.getElementById(convertId)
    let tooltip :any = document.getElementById(tooltipId)


    // Modifying elements
    modal.style.display = display;
    convert.innerHTML = content;
    element.style.outline = outline;

    

    let allClasses = [
        ...tooltipClasses,
        ...modalClasses
    ]

    // Class buffers
    let Adder : string = ""
    let Remover : string = ""
    let TT_Adder : string = ""

    // Setting classes
    if (type == "blue") {
        Adder = modalClasses[0]
        TT_Adder = tooltipClasses[0]
    }

    if (type == "orange") {
        Adder = modalClasses[1]
        TT_Adder = tooltipClasses[1]
    }

    if (type == "gray") {
        Adder = modalClasses[2]
        TT_Adder = tooltipClasses[2]
    }
    
    // Clean up
    if (Adder == "" && Remover == "" && TT_Adder == "") {
        try {
            [modal, tooltip].forEach(entity => {
                allClasses.forEach(className => {
                        entity.classList.remove(className)
                    })
            })

        } catch (error) {
            console.log(error)
        }
        return null
    }

    // Applying classes
    modal.classList.add(Adder)
    tooltip.classList.add(TT_Adder)
    return null

}

function GenerateIds(size: number[]): string[] {
    let ids: string[] = []
    for (let x = 0; x < size[0]; x++) {
        for (let y = 0; y < size[1]; y++) {
            ids.push(x+""+y)
        }
    }
    return ids
}

function CleanBoard(ids: string[]) {
    ids.forEach(id  => {
        Element(id, "", "none", "none", "")
    });
}

function GenerateContent(ratio: number, amount: number, id: string): string {
    return `${ratio} -> <span style='color: blue;background-color: transparent';' id=${id+"-highlight"}>${amount}</span>`
}





export default function MaterialDisplay(props: any) {
    const [amount, setAmount] = useState(1)
    const [current, setCurrent] = useState("")
    const BG = useRef<HTMLDivElement>(null)
    const Indexies: number[] = [props.Mat.materials.length, props.Mat.materials[0].length];
    const IDS = GenerateIds(Indexies)

    const setContent = () => {
        if (current == "") return null;
        CleanBoard(IDS);
        
        
        // Setting for selected element
        let outline: string = ".5rem solid blue";
        let display: string = "grid"
        Element(current, amount.toString(), display, outline, "blue")

        //Set display for minus button
        let minus : any = document.getElementById(current+"-minus")
        minus.innerHTML = "-"

        //Set display for plus button
        let plus :any = document.getElementById(current+"-plus")
        plus.innerHTML = "+"

        IDS.forEach(newId => {
            if (current == newId) return null;
            
            let xId = parseInt(current[0]);
            let x = parseInt(newId[0]);

            let yId = parseInt(current[1]);
            let y = parseInt(newId[1]);
            
            // Default values
            let need = 1
            let get = 1
            
            // Math settings
            let base = 6
            let power = yId -y
            if (y > yId) {
                base = 3
                power = y - yId
            }


            if (x == xId) {
                // Element before selected one
                if (y < yId ) {
                    need = (Math.pow(base, power)) * amount
                    get = amount
                }
                // Element after selected one
                if (y > yId) {
                    get = Math.pow(base, power)
                    while (get < amount) {
                        need += 1
                        get +=  Math.pow(base, power)
                    } 
                }

            }
            // Other rows
            else {
                // Element before selected one
                if (y <= yId) {
                    need = (Math.pow(base, power+1)) * amount
                    get = amount
                }
                // Element after selected one
                else if (y > yId) {
                    get = Math.pow(base, power-1)
                    need = 2
                    while (get < amount) {
                        get += Math.pow(base, power-1)
                        need += 2
                    }
                } 
            }
            
            let content = GenerateContent(need, get, newId)
            let max: any = document.getElementById(newId+"-max")?.innerHTML
            
            let color = "orange"
            if (need > max) {
                color = "gray"
            }
            Element(newId, content, display, "none", color)
        })

    }


    

    const Clear = (event : any) => {
        if (event.target == BG.current) {
            setCurrent("");
            setAmount(1);
            CleanBoard(IDS);
        }
    }

    
    useEffect(() => {
        setContent() 
    }, [amount, current])

    return (
        <div ref={BG} onClick={Clear} className="mt-container">
                {props.Mat.materials.map((row: any, xId: any, key: any) => (
                    <div className="mt-row"
                    key={key+""+xId+"-"+Date.now()}
                    >
                        <div className="mt-cat">
                            <div className="title">{props.Mat.categories[xId]}</div>
                            <div className="line"/>
                        </div>
                        <div className="mt-content">
                        {row.map((col: any, yId: any, key2: any) => (
                                <Slot 
                                    svg={yId} 
                                    id={xId+""+yId} 
                                    w={Indexies[0]} 
                                    h={Indexies[1]} 
                                    max={props.Mat.max[yId]}
                                    amount={amount}
                                    setAmount={setAmount}
                                    current={current}
                                    setCurrent={setCurrent}
                                    grade={Common.grades[yId]}
                                    matId={props.Mat.ids[xId][yId]}
                                    key={key2+""+yId+"-"+Date.now()}
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