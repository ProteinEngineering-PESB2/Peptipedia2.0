import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

const MolecularWeightField = ({
  valueMolecularWeight,
  setValueMolecularWeight,
}) => {
  const handleChangeValueMolecularWeight = (e, newValue) => {
    setValueMolecularWeight(newValue);
  };

  return (
    <Grid item lg={12} xs={12}>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <FormLabel id="label-molecular-weight">Molecular Weight</FormLabel>
        <Slider
          value={valueMolecularWeight}
          onChange={handleChangeValueMolecularWeight}
          aria-labelledby="label-molecular-weight"
          valueLabelDisplay="auto"
          min={-10}
          max={500}
        />
      </FormControl>
    </Grid>
  );
};

export default MolecularWeightField;
