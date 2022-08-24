import {
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";

interface AliphaticIndexFieldProps {
  index: number;
  logicOperatorValueForAliphaticIndex: string;
  handleChangeLogicOperatorAliphaticIndex: (
    e: SelectChangeEvent<string>
  ) => void;
  valueAliphaticIndex: number | number[];
  handleChangeValueAliphaticIndex: (
    e: Event,
    newValue: number | number[]
  ) => void;
  params: any;
}

function AliphaticIndexField({
  handleChangeLogicOperatorAliphaticIndex,
  handleChangeValueAliphaticIndex,
  index,
  logicOperatorValueForAliphaticIndex,
  params,
  valueAliphaticIndex,
}: AliphaticIndexFieldProps) {
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
              value={logicOperatorValueForAliphaticIndex}
              onChange={handleChangeLogicOperatorAliphaticIndex}
            >
              <MenuItem value="AND">AND</MenuItem>
              <MenuItem value="OR">OR</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={9} xs={8}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <FormLabel id="label-aliphatic-index">Aliphatic Index</FormLabel>
              <Slider
                aria-labelledby="label-aliphatic-index"
                valueLabelDisplay="auto"
                step={0.0002}
                value={valueAliphaticIndex}
                onChange={handleChangeValueAliphaticIndex}
                min={params.min_aliphatic_index}
                max={params.max_aliphatic_index}
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <FormLabel id="label-aliphatic-index">Aliphatic Indexx</FormLabel>
          <Slider
            aria-labelledby="label-aliphatic-index"
            valueLabelDisplay="auto"
            step={0.0002}
            value={valueAliphaticIndex}
            onChange={handleChangeValueAliphaticIndex}
            min={params.min_aliphatic_index}
            max={params.max_aliphatic_index}
          />
        </FormControl>
      )}
    </Grid>
  );
}

export default AliphaticIndexField;
