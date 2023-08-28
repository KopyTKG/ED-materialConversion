import Manufactured from "../../store/manufactured.json"
import MaterialDisplay from "@/components/material.display"

export default function ManufacturedMaterials() {
    return (
        <>
            <header>
                Manufactured Materials Conversion
            </header>
            <MaterialDisplay Mat={Manufactured}/>
        </>
    )
}