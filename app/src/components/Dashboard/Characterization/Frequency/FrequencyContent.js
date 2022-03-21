import { useEffect, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import Chart from "./Chart";

const FrequencyContent = ({ data }) => {
  const [autocompleteSequences, setAutocompleteSequences] = useState([]);
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let sequences = [];
    data.forEach((d) => {
      sequences.push(d.id_seq);
    });
    setAutocompleteSequences(sequences);
    setAutocompleteValue(sequences[0]);
    setLoading(false);
  }, [data]);

  const handleChangeAutocompleteValue = (e, newValue) => {
    setAutocompleteValue(newValue);
  };

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
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
                options={autocompleteSequences}
                renderInput={(params) => (
                  <TextField {...params} label="Sequence" />
                )}
              />
            </Paper>
          </Grid>
          <Grid item lg={10} xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Chart data={data} autocompleteValue={autocompleteValue} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default FrequencyContent;
