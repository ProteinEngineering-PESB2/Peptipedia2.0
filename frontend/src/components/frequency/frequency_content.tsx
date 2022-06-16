import { Box, FormControl, Paper } from "@mui/material";
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
      <Box marginTop={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AutocompleteComponent
            title="Sequence"
            options={sequences}
            value={selectedSequence}
            handleChangeValue={handleChangeSelectedSequence}
          />

          <FormControl sx={{ marginTop: 2 }}>
            <BarChart x={x} y={y} title="Frequency Analysis" />
          </FormControl>
        </Paper>
      </Box>
    </>
  );
}
