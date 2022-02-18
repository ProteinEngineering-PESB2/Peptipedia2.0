import { useState } from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import SaveIcon from "@mui/icons-material/Save";

import { geneOntology } from '../../../../services/characterizations'

const Form = ({ setData }) => {
  const [textInput, setTextInput] = useState("");
  const [molecularFunctionCheckbox, setMolecularFunctionCheckbox] =
    useState(true);
  const [biologicalProcessCheckbox, setBiologicalProcessCheckbox] =
    useState(true);
  const [celularComponentCheckbox, setCelularComponentCheckbox] =
    useState(true);
  const [loading, setLoading] = useState(false);

  const handleChangeTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const handleChangeMolecularFunctionCheckbox = (e) => {
    setMolecularFunctionCheckbox(e.target.checked);
  };

  const handleChangeBiologicalProcessCheckbox = (e) => {
    setBiologicalProcessCheckbox(e.target.checked);
  };

  const handleChangeCelularComponentCheckbox = (e) => {
    setCelularComponentCheckbox(e.target.checked);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    const post = {
      data: textInput,
      options: {
        molecular_function: molecularFunctionCheckbox,
        biological_process: biologicalProcessCheckbox,
        celular_component: celularComponentCheckbox,
      },
    };

    const res = await geneOntology(post)

    setData(res)

    setLoading(false)
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Enter Amino Acid sequences"
            multiline
            rows={5}
            sx={{ width: "100%" }}
            onChange={handleChangeTextInput}
          />
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={molecularFunctionCheckbox}
                  onChange={handleChangeMolecularFunctionCheckbox}
                />
              }
              label="Molecular Function"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={biologicalProcessCheckbox}
                  onChange={handleChangeBiologicalProcessCheckbox}
                />
              }
              label="Biological Process"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={celularComponentCheckbox}
                  onChange={handleChangeCelularComponentCheckbox}
                />
              }
              label="Celular Component"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          {loading ? (
            <Stack direction="row" spacing={2}>
              <LoadingButton
                loading
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                loadingPosition="start"
              >
                Loading...
              </LoadingButton>
            </Stack>
          ) : (
            <Button type="submit" variant="contained">
              run characterization
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
