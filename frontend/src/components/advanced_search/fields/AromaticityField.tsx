import {
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";

interface AromaticityFieldProps {
  index: number;
  logicOperatorValueForAromaticity: string;
  handleChangeLogicOperatorAromaticity: (e: SelectChangeEvent<string>) => void;
  valueAromaticity: number | number[];
  handleChangeValueAromaticity: (e: Event, newValue: number | number[]) => void;
  params: any;
}

function AromaticityField({
  handleChangeLogicOperatorAromaticity,
  handleChangeValueAromaticity,
  index,
  logicOperatorValueForAromaticity,
  params,
  valueAromaticity,
}: AromaticityFieldProps) {
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
              value={logicOperatorValueForAromaticity}
              onChange={handleChangeLogicOperatorAromaticity}
            >
              <MenuItem value="AND">AND</MenuItem>
              <MenuItem value="OR">OR</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={9} xs={8}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <FormLabel id="label-aromacity">Aromaticity</FormLabel>
              <Slider
                aria-labelledby="label-aromacity"
                valueLabelDisplay="auto"
                step={0.0002}
                value={valueAromaticity}
                onChange={handleChangeValueAromaticity}
                min={params.min_aromaticity}
                max={params.max_aromaticity}
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <FormLabel id="label-aromacity">Aromaticity</FormLabel>
          <Slider
            aria-labelledby="label-aromacity"
            valueLabelDisplay="auto"
            step={0.0002}
            value={valueAromaticity}
            onChange={handleChangeValueAromaticity}
            min={params.min_aromaticity}
            max={params.max_aromaticity}
          />
        </FormControl>
      )}
    </Grid>
  );
}

export default AromaticityField;
