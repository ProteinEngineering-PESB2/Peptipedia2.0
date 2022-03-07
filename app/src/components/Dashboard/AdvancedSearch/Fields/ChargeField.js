import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

const ChargeField = () => {
  return (
    <Grid item lg={12} xs={12}>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <FormLabel id="label-charge">Charge</FormLabel>
        <Slider
          aria-labelledby="label-charge"
          valueLabelDisplay="auto"
          min={-10}
          max={500}
        />
      </FormControl>
    </Grid>
  );
};

export default ChargeField;
