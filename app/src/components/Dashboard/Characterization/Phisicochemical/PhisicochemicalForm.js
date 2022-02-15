import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import Form from './Form'

const PhisicochemicalForm = () => {
    return (
        <Grid container spacing={3}>
            <Grid item lg={6} sx={{ margin: 'auto' }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Form/>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default PhisicochemicalForm