import { useState } from 'react'

import Grid from '@mui/material/Grid'

import PhisicochemicalForm from './PhisicochemicalForm'
import PhisicochemicalTable from './PhisicochemicalTable'

const Phisicochemical = () => {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])

    return (
        <>
        <Grid container spacing={4}>
            <Grid item>
                <PhisicochemicalForm setData={setData} setColumns={setColumns}/>
            </Grid>
            {data.length > 0 && <Grid item lg={12}><PhisicochemicalTable data={data} columns={columns}/></Grid> }
        </Grid>
        </>
    )
}

export default Phisicochemical