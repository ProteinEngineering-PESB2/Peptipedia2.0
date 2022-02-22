import { useEffect } from "react"

import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Grid from "@mui/material/Grid"

const CodificationContent = ({ data }) => {

    useEffect(() => {
        console.log(data)
    })

    return (
        <>
        <Grid container spacing={3}>
            {data.map((r) => (
                <Grid item lg={4} xs={12}>
                    <Card variant="outlined">
                        <CardHeader
                            title="Hola"
                        />
                        <CardContent>
                            <p>assadsa</p>
                        </CardContent>
                        <CardActions>
                            <Button>Show</Button>
                            <Button>Download</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    )
}

export default CodificationContent