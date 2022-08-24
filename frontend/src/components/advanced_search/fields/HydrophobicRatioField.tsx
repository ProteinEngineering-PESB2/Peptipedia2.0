import {
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";

interface HydrophobicRatioFieldProps {
  index: number;
  logicOperatorValueForHydrophobicRatio: string;
  handleChangeLogicOperatorHydrophobicRatio: (
    e: SelectChangeEvent<string>
  ) => void;
  valueHydrophobicRatio: number | number[];
  handleChangeValueHydrophobicRatio: (
    e: Event,
    newValue: number | number[]
  ) => void;
  params: any;
}

function HydrophobicRatioField({
  handleChangeLogicOperatorHydrophobicRatio,
  handleChangeValueHydrophobicRatio,
  index,
  logicOperatorValueForHydrophobicRatio,
  params,
  valueHydrophobicRatio,
}: HydrophobicRatioFieldProps) {
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
              value={logicOperatorValueForHydrophobicRatio}
              onChange={handleChangeLogicOperatorHydrophobicRatio}
            >
              <MenuItem value="AND">AND</MenuItem>
              <MenuItem value="OR">OR</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={9} xs={8}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <FormLabel id="label-hydrophobic-ratio">
                Hydrophobic Ratio
              </FormLabel>
              <Slider
                aria-labelledby="label-hydrophobic-ratio"
                valueLabelDisplay="auto"
                step={0.0002}
                value={valueHydrophobicRatio}
                onChange={handleChangeValueHydrophobicRatio}
                min={params.min_hydrophobic_ratio}
                max={params.max_hydrophobic_ratio}
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <FormLabel id="label-hydrophobic-ratio">Hydrophobic Ratio</FormLabel>
          <Slider
            aria-labelledby="label-hydrophobic-ratio"
            valueLabelDisplay="auto"
            step={0.0002}
            value={valueHydrophobicRatio}
            onChange={handleChangeValueHydrophobicRatio}
            min={params.min_hydrophobic_ratio}
            max={params.max_hydrophobic_ratio}
          />
        </FormControl>
      )}
    </Grid>
  );
}

export default HydrophobicRatioField;
