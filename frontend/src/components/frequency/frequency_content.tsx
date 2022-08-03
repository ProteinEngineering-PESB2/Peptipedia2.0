import { Box, FormControl, Grid, Paper } from "@mui/material";
import { useChartFrequency } from "../../hooks/useChartFrequency";
import { useSequenceAutocompleteFrequency } from "../../hooks/useSequencesAutocompleteFrequency";
import { IDataFrequency, IDataSummary } from "../../utils/interfaces";
import BarChart from "../charts/bar_chart";
import AutocompleteComponent from "../form/autocomplete_component";
import Plot from "react-plotly.js"

interface Props {
  result: IDataFrequency[];
  summary: IDataSummary;
}

export default function FrequencyContent({ result, summary }: Props) {
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

      {summary.x.length > 0 && (
        <Box marginTop={3} boxShadow={4}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Plot
              data={[
                {
                  x: summary.x,
                  y: summary.y,
                  name: "Summary",
                  error_y: {
                    type: "data",
                    array: summary.z,
                    visible: true,
                  },
                  type: "bar",
                  marker: {
                    color: "#2962ff",
                  },
                },
              ]}
              layout={{
                autosize: true,
                height: 430,
                title: "Summary",
                font: {
                  size: 15,
                },
                barmode: "group",
              }}
              config={{
                displayModeBar: false,
                responsive: true,
              }}
              useResizeHandler
              className="w-full h-full"
            />
          </Paper>
        </Box>
      )}
    </>
  );
}
