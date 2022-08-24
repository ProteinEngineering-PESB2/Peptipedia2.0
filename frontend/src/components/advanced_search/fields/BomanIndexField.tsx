import {
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";

interface BomanIndexFieldProps {
  index: number;
  logicOperatorValueForBomanIndex: string;
  handleChangeLogicOperatorBomanIndex: (e: SelectChangeEvent<string>) => void;
  valueBomanIndex: number | number[];
  handleChangeValueBomanIndex: (e: Event, newValue: number | number[]) => void;
  params: any;
}

function BomanIndexField({
  handleChangeLogicOperatorBomanIndex,
  handleChangeValueBomanIndex,
  index,
  logicOperatorValueForBomanIndex,
  params,
  valueBomanIndex,
}: BomanIndexFieldProps) {
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
              value={logicOperatorValueForBomanIndex}
              onChange={handleChangeLogicOperatorBomanIndex}
            >
              <MenuItem value="AND">AND</MenuItem>
              <MenuItem value="OR">OR</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={9} xs={8}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <FormLabel id="label-boman-index">Boman Index</FormLabel>
              <Slider
                aria-labelledby="label-boman-index"
                valueLabelDisplay="auto"
                step={0.0002}
                value={valueBomanIndex}
                onChange={handleChangeValueBomanIndex}
                min={params.min_boman_index}
                max={params.max_boman_index}
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <FormLabel id="label-boman-index">Boman Index</FormLabel>
          <Slider
            aria-labelledby="label-boman-index"
            valueLabelDisplay="auto"
            step={0.0002}
            value={valueBomanIndex}
            onChange={handleChangeValueBomanIndex}
            min={params.min_boman_index}
            max={params.max_boman_index}
          />
        </FormControl>
      )}
    </Grid>
  );
}

export default BomanIndexField;
