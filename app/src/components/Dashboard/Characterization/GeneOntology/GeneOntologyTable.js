import { useState, useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import Table from "./Table";
import CircularLoading from "../../CircularLoading";

const GeneOntologyTable = ({ data }) => {
  const [typesAutocomplete, setTypesAutocomplete] = useState([]);
  const [valueTypesAutocomplete, setValueTypesAutocomplete] = useState("");
  const [sequencesAutocomplete, setSequencesAutocomplete] = useState([]);
  const [valueSequencesAutocomplete, setValueSequencesAutocomplete] =
    useState("");
  const [inputSequencesAutocomplete, setInputSequencesAutocomplete] =
    useState("");
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useStateIfMounted(true);

  useEffect(() => {
    setLoading(true)
    let types = [];
    let sequences = [];

    data.map((d) => types.push(d.type));

    data[0].prediction.map((i) => sequences.push(i.id_seq));

    let stateColumns = [];

    const dataColumns = Object.keys(data[0].prediction[0].results[0]);
    dataColumns.forEach((column) => {
      stateColumns.push(column.charAt(0).toUpperCase() + column.slice(1));
    });

    stateColumns.push("AmiGO 2");

    setTypesAutocomplete(types);
    setValueTypesAutocomplete(types[0]);
    setSequencesAutocomplete(sequences);
    setValueSequencesAutocomplete(sequences[0]);
    setColumns(stateColumns);

    setLoading(false);
  }, [data]);

  const handleChangeValueTypesAutocomplete = (e) => {
    setValueTypesAutocomplete(e.target.value);
  };

  const handleChangeValueSequencesAutocomplete = (e, newValue) => {
    setValueSequencesAutocomplete(newValue);
  };

  const handleChangeInputSequencesAutocomplete = (e, newInputValue) => {
    setInputSequencesAutocomplete(newInputValue);
  };

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <Grid container spacing={3}>
          <Grid item lg={3} md={4} xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControl>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  aria-labelledby="type-label"
                  label="Type"
                  value={valueTypesAutocomplete}
                  onChange={handleChangeValueTypesAutocomplete}
                >
                  {typesAutocomplete.map((t) => (
                    <MenuItem value={t} key={t}>
                      {t === "molecular_function" && "Molecular Function"}
                      {t === "biological_process" && "Biological Process"}
                      {t === "celular_component" && "Celular Component"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item lg={5} md={4} xs={12}>
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
          />
        </Grid>
      )}
    </>
  );
};

export default GeneOntologyTable;
