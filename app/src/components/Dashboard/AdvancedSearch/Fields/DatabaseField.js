import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const activites = [
  { name: "Activity one" },
  { name: "Activity two" },
  { name: "Activity three" },
  { name: "Activity fout" },
  { name: "Activity five" },
  { name: "Activity six" },
];

const DatabaseField = ({
  valueDatabases,
  setValueDatabases,
  logicOperatorValueForDatabase,
  setLogicOperatorValueForDatabase,
  index
}) => {
  const handleChangeValueDatabases = (e, newValue) => {
    setValueDatabases([...newValue]);
  };

  return (
    <Grid item lg={12} md={12} xs={12}>
      {index !== 0 ? (
        <Grid container spacing={2}>
          <Grid item lg={2.6} xs={4}>
            <Select
              value={logicOperatorValueForDatabase}
              onChange={({ target }) =>
                setLogicOperatorValueForDatabase(target.value)
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
              <Autocomplete
                value={valueDatabases}
                onChange={handleChangeValueDatabases}
                multiple
                options={activites}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Database" />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <Autocomplete
            value={valueDatabases}
            onChange={handleChangeValueDatabases}
            multiple
            options={activites}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Database" />}
          />
        </FormControl>
      )}
    </Grid>
  );
};

export default DatabaseField;
