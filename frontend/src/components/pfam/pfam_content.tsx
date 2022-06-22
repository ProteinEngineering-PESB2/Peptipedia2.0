import { Box, FormControl, Grid, Paper } from "@mui/material";
import { usePfamAutocomplete } from "../../hooks/usePfamAutocomplete";
import { IDataPfam } from "../../utils/interfaces";
import DataTable from "../datatable";
import AutocompleteComponent from "../form/autocomplete_component";

interface Props {
  result: IDataPfam[];
}

export default function PfamContent({ result }: Props) {
  const { sequences, selectedSequence, handleSequenceSelected, table } =
    usePfamAutocomplete({ result });

  return (
    <>
      <Box marginTop={3} boxShadow={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={7} lg={5} xl={4}>
              <AutocompleteComponent
                options={sequences}
                handleChangeValue={handleSequenceSelected}
                title="Sequence"
                value={selectedSequence}
              />
            </Grid>
          </Grid>

          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <DataTable table={table} title="Pfam Result" />
          </FormControl>
        </Paper>
      </Box>
    </>
  );
}
