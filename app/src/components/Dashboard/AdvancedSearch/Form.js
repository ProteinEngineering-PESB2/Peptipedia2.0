import { useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import AddBoxIcon from "@mui/icons-material/AddBox";

import { initialFields } from "./Fields/initialFields";

let fields = initialFields;

const Form = () => {
  const [optionsValue, setOptionsValue] = useState(fields[0]);
  const [options, setOptions] = useState(fields);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChangeOptionsValue = (e, newValue) => {
    setOptionsValue(newValue);
  };

  const addField = ({ label }) => {
    setSelectedOptions([...selectedOptions, label]);
    fields = fields.filter((f) => f.label !== label);
    setOptions(fields);
    setOptionsValue(fields[0]);
  };

  const onReset = () => {
    fields = initialFields;
    setOptions(fields);
    setOptionsValue(fields[0]);
    setSelectedOptions([]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item lg={12}>
        <Grid
          container
          spacing={3}
          sx={{ dispay: "flex", alignItems: "center" }}
        >
          <Grid item lg={2.5}>
            <Autocomplete
              disablePortal
              options={options}
              renderInput={(params) => <TextField {...params} label="Fields" />}
              value={optionsValue}
              onChange={handleChangeOptionsValue}
            />
          </Grid>
          <Grid item lg={2}>
            <Button
              variant="contained"
              size="large"
              onClick={() => addField(optionsValue)}
              disabled={optionsValue ? false : true}
            >
              <AddBoxIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {selectedOptions.map((s) => (
        <h1>{s}</h1>
      ))}
      <Grid item lg={12}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Seach</Button>
          <Button variant="contained" color="error" onClick={onReset}>
            Reset
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Form;
