import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const activites = [
  { name: "Activity one" },
  { name: "Activity two" },
  { name: "Activity three" },
  { name: "Activity fout" },
  { name: "Activity five" },
  { name: "Activity six" },
];

const DatabaseField = ({ valueDatabases, setValueDatabases }) => {
  const handleChangeValueDatabases = (e, newValue) => {
    setValueDatabases([...newValue]);
  };

  return (
    <Grid item lg={12} md={12} xs={12}>
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
    </Grid>
  );
};

export default DatabaseField;
