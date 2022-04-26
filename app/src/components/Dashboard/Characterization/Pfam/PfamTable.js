import { useState, useEffect } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import Table from "./Table";
import CircularLoading from "../../CircularLoading";

const PfamTable = ({ data }) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
      {loading ? (
        <CircularLoading />
      ) : (
        <Grid container spacing={3}>
          <Grid item lg={12} xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid container spacing={4}>
                <Grid item xl={2} lg={2.5} md={3} sm={5} xs={12}>
                  <Autocomplete
                    disablePortal
                    value={autocompleteValue}
                    onChange={handleChangeAutocompleteValue}
                    options={autocompleteOptions}
                    renderInput={(params) => (
                      <TextField {...params} label="Sequence" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Table data={data} autocompleteValue={autocompleteValue} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PfamTable;
