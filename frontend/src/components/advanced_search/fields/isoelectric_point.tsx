import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";

import { SelectChangeEvent } from "@mui/material";

interface Props {
  valueIsoelectricPoint: number | number[];
  handleChangeValueIsoelectricPoint: (
    e: Event,
    newValue: number | number[]
  ) => void;
  logicOperatorValueForIsoelectricPoint: string;
  handleChangeLogicOperatorIsoelectricPoint: (
    e: SelectChangeEvent<string>
  ) => void;
  index: number;
  params: any;
}

const IsoelectricPointField = ({
  valueIsoelectricPoint,
  handleChangeValueIsoelectricPoint,
  logicOperatorValueForIsoelectricPoint,
  handleChangeLogicOperatorIsoelectricPoint,
  index,
  params,
}: Props) => {
  return (
    <Grid item lg={12} md={12} xs={12}>
      {index !== 0 ? (
        <Grid container spacing={2}>
          <Grid item lg={2.6} xs={4}>
            <Select
              value={logicOperatorValueForIsoelectricPoint}
              onChange={handleChangeLogicOperatorIsoelectricPoint}
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
              <FormLabel id="label-isoelectric-point">
                Isoelectric Point
              </FormLabel>
              <Slider
                value={valueIsoelectricPoint}
                onChange={handleChangeValueIsoelectricPoint}
                aria-labelledby="label-isoelectric-point"
                valueLabelDisplay="auto"
                min={params.min_isoelectric_point}
                max={params.max_isoelectric_point}
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <FormLabel id="label-isoelectric-point">Isoelectric Point</FormLabel>
          <Slider
            value={valueIsoelectricPoint}
            onChange={handleChangeValueIsoelectricPoint}
            aria-labelledby="label-isoelectric-point"
            valueLabelDisplay="auto"
            min={params.min_isoelectric_point}
            max={params.max_isoelectric_point}
          />
        </FormControl>
      )}
    </Grid>
  );
};

export default IsoelectricPointField;
