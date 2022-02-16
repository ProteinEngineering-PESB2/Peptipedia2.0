import { useEffect } from 'react'

import MUIDataTable from 'mui-datatables'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import $ from 'jquery'

const options = {
    selectableRowsHideCheckboxes: true,
    expandableRowsOnClick: true
};

const PhisicochemicalTable = ({ data, columns }) => {   
    
    useEffect(() => {
        $("#example").DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        })
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item lg={12} xs={12}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <table id="example" className='table table-striped table-hover text-center'>
                        <thead>
                            <tr>
                                {columns.map((column) => {
                                    return (
                                        <th key={column.label}>{column.label}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d) => {
                                return (
                                    <tr key={d.id}>
                                        {d.id && <td>{d.id}</td>}
                                        {d.length && <td>{d.length}</td>}
                                        {d.molecular_weight && <td>{d.molecular_weight}</td>}
                                        {d.isoelectric_point && <td>{d.isoelectric_point}</td>}
                                        {d.charge_density && <td>{d.charge_density}</td>}
                                        {d.charge && <td>{d.charge}</td>}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Paper>

                {/* <MUIDataTable
                    title={"Phisicochemical Characterization"}
                    data={data}
                    columns={columns}
                    options={options}
                /> */}
            </Grid>
        </Grid>
    )
}

export default PhisicochemicalTable