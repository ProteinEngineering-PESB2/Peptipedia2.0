import { Box, FormControl, Grid, Paper } from "@mui/material";
import { useChartFrequency } from "../../hooks/useChartFrequency";
import { useSequenceAutocompleteFrequency } from "../../hooks/useSequencesAutocompleteFrequency";
import { IDataFrequency } from "../../utils/interfaces";
import BarChart from "../charts/bar_chart";
import AutocompleteComponent from "../form/autocomplete_component";

interface Props {
  result: IDataFrequency[];
}

export default function FrequencyContent({ result }: Props) {
  const { sequences, selectedSequence, handleChangeSelectedSequence } =
    useSequenceAutocompleteFrequency({ result });

  const { x, y } = useChartFrequency({ result, sequence: selectedSequence });

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
                title="Sequence"
                options={sequences}
                value={selectedSequence}
                handleChangeValue={handleChangeSelectedSequence}
              />
            </Grid>
          </Grid>

          <FormControl sx={{ marginTop: 2 }}>
            <BarChart x={x} y={y} title="Frequency Analysis" />
          </FormControl>
        </Paper>
      </Box>
    </>
  );
}
