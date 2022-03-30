import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Form = () => {
  return (
    <>
      <form>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl>
              <FormLabel id="encoding-label">Encoding Type</FormLabel>
              <FormGroup aria-labelledby="encoding-label">
                <FormControlLabel
                  control={<Checkbox />}
                  label="One Hot Encoding"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Phisicochemical Properties"
                />
                <FormControlLabel control={<Checkbox />} label="FFT" />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl>
              <FormLabel id="select-property-label">
                Select Phisicochemical Properties
              </FormLabel>
              <FormGroup aria-labelledby="select-property-label">
                <FormControlLabel
                  control={<Checkbox />}
                  label="Alpha Structure"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Beta Structure"
                />
                <FormControlLabel control={<Checkbox />} label="Energetic" />
                <FormControlLabel control={<Checkbox />} label="Hidropathy" />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Hydrophobicity"
                />
                <FormControlLabel control={<Checkbox />} label="Index" />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Secondary Structure"
                />
                <FormControlLabel control={<Checkbox />} label="Volume" />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="algorithm-select-label">Algorithm</InputLabel>
              <Select
                aria-labelledby="algorithm-label"
                labelId="algorithm-select-label"
                label="Algorithm"
              >
                <MenuItem>K-Means</MenuItem>
                <MenuItem>DBScan</MenuItem>
                <MenuItem>Meanshift</MenuItem>
                <MenuItem>Birch</MenuItem>
                <MenuItem>Agglomerative</MenuItem>
                <MenuItem>Affinity</MenuItem>
                <MenuItem>Optics</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Form;
