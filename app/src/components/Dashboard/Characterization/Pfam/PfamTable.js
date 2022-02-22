import { useState, useEffect } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import Table from "./Table";

const PfamTable = ({ data }) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sequences = [];
    data.forEach((d) => sequences.push(d.id));

    setAutocompleteOptions(sequences);
    setAutocompleteValue(sequences[0]);
    setLoading(false);
  }, [data]);

  const handleChangeAutocompleteValue = (e, newValue) => {
    setAutocompleteValue(newValue);
  };

  return (
    <>
      {loading === false && (
        <Grid container spacing={3}>
          <Grid item lg={5} xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Autocomplete
                disablePortal
                value={autocompleteValue}
                onChange={handleChangeAutocompleteValue}
                options={autocompleteOptions}
                renderInput={(params) => (
                  <TextField {...params} label="Sequence" />
                )}
              />
            </Paper>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Table data={data} autocompleteValue={autocompleteValue} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PfamTable;
