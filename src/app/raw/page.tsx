import Raw from "../../store/raw.json"
import MaterialDisplay from "@/components/material.display"

export default function RawMaterials() {

    return (
        <>
            <header>
                Raw Materials Convertion
            </header>
            <MaterialDisplay Mat={Raw}/>
        </>
    )
}