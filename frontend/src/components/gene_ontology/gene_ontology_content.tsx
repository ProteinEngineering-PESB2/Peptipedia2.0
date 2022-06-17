import { Box, Paper, FormControl, Grid } from "@mui/material";
import { useDataTableGO } from "../../hooks/useDataTableGO";
import { useSequenceAutocompleteGO } from "../../hooks/useSequenceAutocompleteGO";
import { useTypeAutocompleteGO } from "../../hooks/useTypeAutocompleteGO";
import { useTypeGeneOnotology } from "../../hooks/useTypeGeneOntology";
import { IDataGeneOntology } from "../../utils/interfaces";
import DataTable from "../datatable";
import AutocompleteComponent from "../form/autocomplete_component";
import SelectComponent from "../form/select_component";

interface Props {
  result: IDataGeneOntology[];
}

export default function GeneOntologyContent({ result }: Props) {
  const { types_go, selectedTypeGO, handleChangeSelectedTypeGO } =
    useTypeGeneOnotology();
  const { sequences, selectedSequence, handleChangeSelectedSequence } =
    useSequenceAutocompleteGO({ result, type: selectedTypeGO });

  const { table } = useDataTableGO({
    result,
    sequence: selectedSequence,
    type: selectedTypeGO,
  });

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
            <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
              <SelectComponent
                title="Type"
                items={types_go}
                value={selectedTypeGO}
                handleChange={handleChangeSelectedTypeGO}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={5} xl={4}>
              <AutocompleteComponent
                title="Sequence"
                options={sequences}
                value={selectedSequence}
                handleChangeValue={handleChangeSelectedSequence}
              />
            </Grid>
          </Grid>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <DataTable table={table} title="Gene Ontology Results" />
          </FormControl>
        </Paper>
      </Box>
    </>
  );
}
