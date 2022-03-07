import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

const LengthField = ({ valueLength, setValueLength }) => {
  const handleChangeValueLength = (e, newValue) => {
    setValueLength(newValue);
  };

  return (
    <Grid item lg={12} xs={12}>
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
  );
};

export default LengthField;
