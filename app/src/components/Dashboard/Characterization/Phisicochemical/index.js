import { useState } from 'react'

import PhisicochemicalForm from './PhisicochemicalForm'
import PhisicochemicalTable from './PhisicochemicalTable'

const Phisicochemical = () => {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])

    return (
        <>
        {data.length === 0 ? (
            <PhisicochemicalForm setData={setData} setColumns={setColumns}/>
        ) : (
            <PhisicochemicalTable data={data} columns={columns}/>
        )}
        </>
    )
}

export default Phisicochemical