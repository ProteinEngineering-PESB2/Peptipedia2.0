import { useState, useEffect } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import Table from "./Table";

const GeneOntologyTable = ({ data }) => {
  const [typesAutocomplete, setTypesAutocomplete] = useState([]);
  const [valueTypesAutocomplete, setValueTypesAutocomplete] = useState("");
  const [inputTypesAutocomplete, setInputTypesAutocomplete] = useState("");
  const [sequencesAutocomplete, setSequencesAutocomplete] = useState([]);
  const [valueSequencesAutocomplete, setValueSequencesAutocomplete] =
    useState("");
  const [inputSequencesAutocomplete, setInputSequencesAutocomplete] =
    useState("");
  const [columns, setColumns] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let types = [];
    let sequences = [];

    data.map((d) => types.push(d.type));

    data[0].prediction.map((i) => sequences.push(i.id_seq));

    let stateColumns = [];
    let stateHeaders = [];

    const dataColumns = Object.keys(data[0].prediction[0].results[0]);
    dataColumns.forEach((column) => {
      stateColumns.push({ field: column, filter: true, sortable: true });
      stateHeaders.push({
        label: column.charAt(0).toUpperCase() + column.slice(1),
        key: column,
      });
    });

    stateColumns.push({ field: "AmiGO 2", minWidth: 520 });
    stateHeaders.push({ label: "AmiGO 2", key: "AmiGO 2" });

    setTypesAutocomplete(types);
    setValueTypesAutocomplete(types[0]);
    setSequencesAutocomplete(sequences);
    setValueSequencesAutocomplete(sequences[0]);
    setColumns(stateColumns);
    setHeaders(stateHeaders);

    setLoading(false);
  }, [data]);

  const handleChangeValueTypesAutocomplete = (e, newValue) => {
    setValueTypesAutocomplete(newValue);
  };

  const handleChangeInputTypesAutocomplete = (e, newInputValue) => {
    setInputTypesAutocomplete(newInputValue);
  };

  const handleChangeValueSequencesAutocomplete = (e, newValue) => {
    setValueSequencesAutocomplete(newValue);
  };

  const handleChangeInputSequencesAutocomplete = (e, newInputValue) => {
    setInputSequencesAutocomplete(newInputValue);
  };

  return (
    <>
      {loading === false && (
        <Grid container spacing={3}>
          <Grid item lg={3} xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Autocomplete
                disablePortal
                value={valueTypesAutocomplete}
                onChange={handleChangeValueTypesAutocomplete}
                inputValue={inputTypesAutocomplete}
                onInputChange={handleChangeInputTypesAutocomplete}
                options={typesAutocomplete}
                renderInput={(params) => <TextField {...params} label="Type" />}
              />
            </Paper>
          </Grid>
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
                value={valueSequencesAutocomplete}
                onChange={handleChangeValueSequencesAutocomplete}
                inputValue={inputSequencesAutocomplete}
                onInputChange={handleChangeInputSequencesAutocomplete}
                options={sequencesAutocomplete}
                renderInput={(params) => (
                  <TextField {...params} label="Sequence" />
                )}
              />
            </Paper>
          </Grid>
          <Table
            type={valueTypesAutocomplete}
            sequence={valueSequencesAutocomplete}
            data={data}
            columns={columns}
            headers={headers}
          />
        </Grid>
      )}
    </>
  );
};

export default GeneOntologyTable;
