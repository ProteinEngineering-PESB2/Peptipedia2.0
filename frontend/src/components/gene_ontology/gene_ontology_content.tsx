import { Box, Paper, Stack, FormControl } from "@mui/material";
import { useDataTableGO } from "../../hooks/useDataTableGO";
import { useSequenceAutocompleteGO } from "../../hooks/useSequenceAutocompleteGO";
import { useTypeAutocompleteGO } from "../../hooks/useTypeAutocompleteGO";
import { IDataGeneOntology } from "../../utils/interfaces";
import DataTable from "../datatable";
import AutocompleteComponent from "../form/autocomplete_component";

interface Props {
  result: IDataGeneOntology[];
}

export default function GeneOntologyContent({ result }: Props) {
  const { types, selectedType, handleChangeSelectedType } =
    useTypeAutocompleteGO({ result });

  const { sequences, selectedSequence, handleChangeSelectedSequence } =
    useSequenceAutocompleteGO({ result, type: selectedType });

  const { table } = useDataTableGO({
    result,
    sequence: selectedSequence,
    type: selectedType,
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
          <Stack direction="row" spacing={2}>
            <AutocompleteComponent
              title="Type"
              options={types}
              value={selectedType}
              handleChangeValue={handleChangeSelectedType}
            />
            <AutocompleteComponent
              title="Sequence"
              options={sequences}
              value={selectedSequence}
              handleChangeValue={handleChangeSelectedSequence}
            />
          </Stack>

          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <DataTable table={table} title="Gene Ontology Results" />
          </FormControl>
        </Paper>
      </Box>
    </>
  );
}
