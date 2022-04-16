import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const options = ["Option 1", "Option 2"];

const PfamField = ({
  valuePfam,
  handleChangeValuePfam,
  logicOperatorValueForPfam,
  setLogicOperatorValueForPfam,
  index,
}) => {
  return (
    <Grid item lg={12} md={12} xs={12}>
      {index !== 0 ? (
        <Grid container spacing={2}>
          <Grid item lg={2.6} xs={4}>
            <Select
              value={logicOperatorValueForPfam}
              onChange={({ target }) =>
                setLogicOperatorValueForPfam(target.value)
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
            <FormControl sx={{ width: "100%" }}>
              <Autocomplete
                value={valuePfam}
                onChange={handleChangeValuePfam}
                options={options}
                renderInput={(params) => <TextField {...params} label="Pfam" />}
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <FormControl sx={{ width: "100%" }}>
          <Autocomplete
            value={valuePfam}
            onChange={handleChangeValuePfam}
            options={options}
            renderInput={(params) => <TextField {...params} label="Pfam" />}
          />
        </FormControl>
      )}
    </Grid>
  );
};

export default PfamField;
