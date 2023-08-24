import Manufactured from "../../store/manufactured.json"
import MaterialDisplay from "@/components/material.display"

export default function ManufacturedMaterials() {
    return (
        <>
            <header>
                Manufactured Materials Convertion
            </header>
            <MaterialDisplay Mat={Manufactured}/>
        </>
    )
}