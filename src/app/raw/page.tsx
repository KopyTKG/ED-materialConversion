import Slot from "@/components/material.module"
import Raw from "../../store/raw.json"

export default function RawMaterials() {
    const width = Raw.materials[0].length;
    const height = Raw.materials.length

    return (
        <>
            <header>
                Raw Materials Convertion
            </header>
            <div>
                {Raw.materials.map((row, xId) => (
                    <div className="mt-row">
                        <div className="mt-cat">
                            <div className="title">{Raw.categories[xId]}</div>
                            <div className="line"/>
                        </div>
                        <div className="mt-content">
                        {row.map((col, yId) => (
                            <Slot svg={yId} id={xId+""+yId} w={width} h={height}>
                                {col}
                            </Slot>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}