import { useState } from 'react'

import PhisicochemicalForm from './PhisicochemicalForm'

const Phisicochemical = () => {
    const [data, setData] = useState([])

    return (
        <>
        {data.length === 0 ? (
            <PhisicochemicalForm/>
        ) : (
            <h1>Tabla</h1>
        )}
        </>
    )
}

export default Phisicochemical