import { useEffect, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import Chart from "./Chart";
import CircularLoading from "../../CircularLoading";

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
        <CircularLoading />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                    options={autocompleteSequences}
                    renderInput={(params) => (
                      <TextField {...params} label="Sequence" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Chart data={data} autocompleteValue={autocompleteValue} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default FrequencyContent;
