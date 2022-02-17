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
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    let types = [];
    let sequences = [];

    data.map((d) => {
      types.push(d.type);
    });

    data[0].prediction.map((i) => {
      sequences.push(i.id_seq);
    });

    setTypesAutocomplete(types);
    setValueTypesAutocomplete(types[0]);
    setSequencesAutocomplete(sequences);
    setValueSequencesAutocomplete(sequences[0]);

    setLoading(false)
  }, []);

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
        <Grid container spacing={2}>
          <Grid item lg={3} xs={12}>
            <Autocomplete
              disablePortal
              value={valueTypesAutocomplete}
              onChange={handleChangeValueTypesAutocomplete}
              inputValue={inputTypesAutocomplete}
              onInputChange={handleChangeInputTypesAutocomplete}
              options={typesAutocomplete}
              renderInput={(params) => <TextField {...params} label="Type" />}
            />
          </Grid>
          <Grid item lg={5} xs={12}>
            <Autocomplete
              disablePortal
              value={valueSequencesAutocomplete}
              onChange={handleChangeValueSequencesAutocomplete}
              inputValue={inputSequencesAutocomplete}
              onInputChange={handleChangeInputSequencesAutocomplete}
              options={sequencesAutocomplete}
              renderInput={(params) => <TextField {...params} label="Sequence" />}
            />
          </Grid>
          <Grid item lg={12}>
            <Table type={valueTypesAutocomplete} sequence={valueSequencesAutocomplete} data={data}/>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default GeneOntologyTable;
