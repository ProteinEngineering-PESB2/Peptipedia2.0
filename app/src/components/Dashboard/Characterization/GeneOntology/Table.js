import { useState, useEffect } from 'react'

import MUIDataTable from 'mui-datatables'

const columns = [
    {
        name: "id_go",
        label: "ID GO",
    },
    {
        name: "probability",
        label: "Probability",
    },
    {
        name: "term",
        label: "Term",
    }
]

const Table = ({ type, sequence, data }) => {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        data.map((d) => {
            if (d.type === type) {
                d.prediction.map((i) => {
                    if (i.id_seq === sequence) {
                        setResults(i.results)
                        console.log(i.results)
                    }
                })
            }
        })
        setLoading(false)
    }, [type, sequence])

    return (
        <>
        {loading === false && (
            <MUIDataTable
                title="titulo"
                data={results}
                columns={columns}
            />
        )}
        </>
    )
}

export default Table