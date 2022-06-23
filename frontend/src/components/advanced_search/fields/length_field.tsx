import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  valueLength: number | number[];
  handleChangeValueLength: (e: Event, newValue: number | number[]) => void;
  logicOperatorValueForLength: string;
  handleChangeLogicOperatorLength: (e: SelectChangeEvent<string>) => void;
  index: number;
  params: any;
}

const LengthField = ({
  valueLength,
  handleChangeValueLength,
  logicOperatorValueForLength,
  handleChangeLogicOperatorLength,
  index,
  params,
}: Props) => {
  return (
    <Grid item lg={12} md={12} xs={12}>
      {index === 0 ? (
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <FormLabel id="label-length">Length</FormLabel>
          <Slider
            value={valueLength}
            onChange={handleChangeValueLength}
            aria-labelledby="label-length"
            valueLabelDisplay="auto"
            min={params.min_length}
            max={params.max_length}
          />
        </FormControl>
      ) : (
        <Grid container spacing={2}>
          <Grid item lg={2.6} xs={4}>
            <Select
              value={logicOperatorValueForLength}
              onChange={handleChangeLogicOperatorLength}
              label="Operator"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{ width: "100%" }}
            >
              <MenuItem value="AND">AND</MenuItem>
              <MenuItem value="OR">OR</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={9} xs={8}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <FormLabel id="label-length">Length</FormLabel>
              <Slider
                value={valueLength}
                onChange={handleChangeValueLength}
                aria-labelledby="label-length"
                valueLabelDisplay="auto"
                min={params.min_length}
                max={params.max_length}
              />
            </FormControl>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default LengthField;
