'use client'

export default function Slot(props: any) {
    const setContent = (id: string) => {
        const width = props.w;
        const height = props.h
        let current : any = document.getElementById(id);

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                let newId = i+""+j;
                let modalId = newId+"-modal"
                let convertId = newId+"-convert"
                let element_modal :any = document.getElementById(modalId)
                let element_convert: any = document.getElementById(convertId)
                let element :any = document.getElementById(newId);
                element_convert.innerHTML = "";
                element_modal.style.display = "none";
                element.style.outline = "none";
            }
        }
        for (let x = 0; x < height; x++) {
            for (let y = 0; y < width; y++) {
                
                current.style.outline = ".5rem solid blue";

                let newId = x+""+y
                let modalId = newId+"-modal"
                let convertId = newId+"-convert"
                let xId = parseInt(id[0]);
                let yId = parseInt(id[1]);
                let ratio = 0
                let content = ""

                if (x == xId) {
                    console.log("here")
                    if (y < yId ) {
                        ratio = Math.pow(6, yId-y)
                        content = `${ratio} -> <span style='color: blue;background-color: transparent';'>1</span> ` 

                    }
                    if (y > yId) {
                        ratio = Math.pow(3, y - yId)
                        content = `1 -> <span style='color: blue;background-color: transparent';'>${ratio}</span> ` 
                    }
                }
                else if (x != xId) {
                    if (y == yId ) {
                        ratio = 6
                        content = `${ratio} -> <span style='color: blue;background-color: transparent';'>1</span>`

                    }
                    if (y < yId) {
                        ratio = Math.pow(6, (yId-(y-1)))
                        content = `${ratio} -> <span style='color: blue;background-color: transparent';'>1</span>`
                    }
                    if (y > yId) {
                        ratio = Math.pow(3, (y-1) - yId )
                        content = `2-> <span style='color: blue;background-color: transparent;'>${ratio}</span> `

                    }
                }
                
                    

                if (id === newId) continue;
                else {
                    
                    let element_convert: any = document.getElementById(convertId);
                    element_convert.innerHTML = content;
                    let element_modal :any = document.getElementById(modalId);
                    element_modal.style.display = "flex";
                }
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