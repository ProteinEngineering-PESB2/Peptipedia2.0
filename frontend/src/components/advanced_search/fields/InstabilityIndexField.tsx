import {
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";

interface InstabilityIndexProps {
  index: number;
  logicOperatorValueForInstabilityIndex: string;
  handleChangeLogicOperatorInstabilityIndex: (
    e: SelectChangeEvent<string>
  ) => void;
  valueInstabilityIndex: number | number[];
  handleChangeValueInstabilityIndex: (
    e: Event,
    newValue: number | number[]
  ) => void;
  params: any;
}

function InstabilityIndexField({
  index,
  logicOperatorValueForInstabilityIndex,
  handleChangeLogicOperatorInstabilityIndex,
  handleChangeValueInstabilityIndex,
  params,
  valueInstabilityIndex,
}: InstabilityIndexProps) {
  return (
    <Grid item lg={12} md={12} xs={12}>
      {index !== 0 ? (
        <Grid container spacing={2}>
          <Grid item lg={2.6} xs={4}>
            <Select
              label="Operator"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{ width: "100%" }}
              value={logicOperatorValueForInstabilityIndex}
              onChange={handleChangeLogicOperatorInstabilityIndex}
            >
              <MenuItem value="AND">AND</MenuItem>
              <MenuItem value="OR">OR</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={9} xs={8}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <FormLabel id="label-instability-index">
                Instability Index
              </FormLabel>
              <Slider
                aria-labelledby="label-instability-index"
                valueLabelDisplay="auto"
                step={0.0002}
                value={valueInstabilityIndex}
                onChange={handleChangeValueInstabilityIndex}
                min={params.min_instability_index}
                max={params.max_instability_index}
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <FormLabel id="label-instability-index">Instability Index</FormLabel>
          <Slider
            aria-labelledby="label-instability-index"
            valueLabelDisplay="auto"
            step={0.0002}
            value={valueInstabilityIndex}
            onChange={handleChangeValueInstabilityIndex}
            min={params.min_instability_index}
            max={params.max_instability_index}
          />
        </FormControl>
      )}
    </Grid>
  );
}

export default InstabilityIndexField;
