import Encoded from "@/store/encoded.json"
import MaterialDisplay from "@/components/material.display"

export default function EncodedMaterials() {
    return (
        <>
            <header>
                Encoded Materials Conversion
            </header>
            <MaterialDisplay Mat={Encoded}/>
        </>
    )
}