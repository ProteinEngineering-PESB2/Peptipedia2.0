import { useEffect } from "react"

const CodificationContent = ({ data }) => {

    useEffect(() => {
        console.log(data)
    })

    return (
        <div>Codification</div>
    )
}

export default CodificationContent