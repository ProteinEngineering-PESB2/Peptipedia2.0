import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";

const LengthField = ({
  valueLength,
  setValueLength,
  logicOperatorValueForLength,
  setLogicOperatorValueForLength
}) => {
  const handleChangeValueLength = (e, newValue) => {
    setValueLength(newValue);
  };

  return (
    <Grid item lg={12} md={12} xs={12}>
      <Grid container spacing={2}>
        <Grid item lg={2.6} xs={4}>
          <Select
            value={logicOperatorValueForLength}
            onChange={({ target }) =>
              setLogicOperatorValueForLength(target.value)
            }
            label="Operator"
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{ width: '100%' }}
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
              min={-10}
              max={500}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LengthField;
