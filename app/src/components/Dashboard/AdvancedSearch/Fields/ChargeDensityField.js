import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";

const ChargeDensityField = ({
  valueChargeDensity,
  setValueChargeDensity,
  logicOperatorValueForChargeDensity,
  setLogicOperatorValueForChargeDensity,
  selectedOptions,
}) => {
  const handleChangeValueChargeDensity = (e, newValue) => {
    setValueChargeDensity(newValue);
  };

  return (
    <Grid item lg={12} md={12} xs={12}>
      {selectedOptions.includes("Length") ||
      selectedOptions.includes("Molecular Weight") ||
      selectedOptions.includes("Isoelectric Point") ||
      selectedOptions.includes("Charge") ? (
        <Grid container spacing={2}>
          <Grid item lg={2.6} xs={4}>
            <Select
              value={logicOperatorValueForChargeDensity}
              onChange={({ target }) =>
                setLogicOperatorValueForChargeDensity(target.value)
              }
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
              <FormLabel id="label-charge-density">ChargeDensity</FormLabel>
              <Slider
                value={valueChargeDensity}
                onChange={handleChangeValueChargeDensity}
                aria-labelledby="label-charge-density"
                valueLabelDisplay="auto"
                min={-10}
                max={500}
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <FormLabel id="label-charge-density">ChargeDensity</FormLabel>
          <Slider
            value={valueChargeDensity}
            onChange={handleChangeValueChargeDensity}
            aria-labelledby="label-charge-density"
            valueLabelDisplay="auto"
            min={-10}
            max={500}
          />
        </FormControl>
      )}
    </Grid>
  );
};

export default ChargeDensityField;
