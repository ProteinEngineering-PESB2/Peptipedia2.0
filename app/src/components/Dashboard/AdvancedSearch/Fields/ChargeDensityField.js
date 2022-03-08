import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

const ChargeDensityField = ({ valueChargeDensity, setValueChargeDensity }) => {
  const handleChangeValueChargeDensity = (e, newValue) => {
    setValueChargeDensity(newValue);
  };

  return (
    <Grid item lg={12} md={12} xs={12}>
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
  );
};

export default ChargeDensityField;
