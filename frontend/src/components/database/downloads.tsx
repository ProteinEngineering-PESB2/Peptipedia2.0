import { Box, Stack, Button, Grid } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { downloadFile } from "../../services/downloadFile";

interface Props {
  setOpenBackdrop: Dispatch<SetStateAction<boolean>>;
  setPercentage: Dispatch<SetStateAction<number>>;
}

export default function Downloads({ setOpenBackdrop, setPercentage }: Props) {
  return (
    <Box marginTop={3}>
      <Grid container spacing={2}>
        <Grid item xl={2.3} lg={3.2} md={5} sm={12} xs={12}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#2962ff",
              ":hover": { backgroundColor: "#2962ff" },
              width: "100%",
            }}
            onClick={() =>
              downloadFile({
                url: "https://static.peptipedia.cl/downloads/dump_csv.zip",
                name: "dump_csv.zip",
                setOpenBackdrop: setOpenBackdrop,
                setPercentage: setPercentage,
              })
            }
          >
            Download as CSV
          </Button>
        </Grid>
        <Grid item xl={2.3} lg={3.2} md={5} sm={12} xs={12}>
          <Button
            variant="contained"
            size="large"
            onClick={() =>
              downloadFile({
                url: "https://static.peptipedia.cl/downloads/dump_sql.zip",
                name: "dump_sql.zip",
                setOpenBackdrop: setOpenBackdrop,
                setPercentage: setPercentage,
              })
            }
            color="warning"
            sx={{ width: "100%" }}
          >
            Download as SQL
          </Button>
        </Grid>
        <Grid item xl={2.3} lg={3.2} md={5} sm={12} xs={12}>
          <Button
            variant="contained"
            size="large"
            onClick={() =>
              downloadFile({
                url: "https://static.peptipedia.cl/downloads/dump_fasta.zip",
                name: "dump_fasta.zip",
                setOpenBackdrop: setOpenBackdrop,
                setPercentage: setPercentage,
              })
            }
            sx={{ width: "100%" }}
            color="secondary"
          >
            Download as Fasta
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
