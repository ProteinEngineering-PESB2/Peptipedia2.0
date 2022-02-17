import { useState } from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import LoadingButton from "@mui/lab/LoadingButton";

import SaveIcon from "@mui/icons-material/Save";

import { phisicochemical } from "../../../../services/characterizations";

const Form = ({ setData, setColumns }) => {
  const [lengthCheckbox, setLengthCheckbox] = useState(true);
  const [molecularWeightCheckbox, setMolecularWeightCheckbox] = useState(true);
  const [isoelectricPointCheckbox, setIsoelectricPointCheckbox] =
    useState(true);
  const [chargeDensityCheckbox, setChargeDensityCheckbox] = useState(true);
  const [chargeCheckbox, setChargeCheckbox] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeLengthCheckbox = (e) => {
    setLengthCheckbox(e.target.checked);
  };

  const handleChangeMolecularWeightCheckbox = (e) => {
    setMolecularWeightCheckbox(e.target.checked);
  };

  const handleChangeIsoelectricPointCheckbox = (e) => {
    setIsoelectricPointCheckbox(e.target.checked);
  };

  const handleChangeChargeDensityCheckbox = (e) => {
    setChargeDensityCheckbox(e.target.checked);
  };

  const handleChangeChargeCheckbox = (e) => {
    setChargeCheckbox(e.target.checked);
  };

  const handleChangeTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const options = {
      length: lengthCheckbox,
      molecular_weight: molecularWeightCheckbox,
      isoelectric_point: isoelectricPointCheckbox,
      charge_density: chargeDensityCheckbox,
      charge: chargeCheckbox,
    };

    let columns = [];

    columns.push({ label: "Sequence" });
    if (lengthCheckbox) columns.push({ label: "Length" });
    if (molecularWeightCheckbox) columns.push({ label: "Molecular Weight" });
    if (isoelectricPointCheckbox) columns.push({ label: "Isoelectric Point" });
    if (chargeDensityCheckbox) columns.push({ label: "Charge Density" });
    if (chargeCheckbox) columns.push({ label: "Charge" });

    setColumns(columns);

    const post = {
      data: textInput,
      options,
    };

    const res = await phisicochemical(post);

    setLoading(false);
    setData(res);
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
          <Stack direction="row" spacing={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={chargeDensityCheckbox}
                    onChange={handleChangeChargeDensityCheckbox}
                  />
                }
                label="Charge Density"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={molecularWeightCheckbox}
                    onChange={handleChangeMolecularWeightCheckbox}
                  />
                }
                label="Molecular Weight"
              />
            </FormGroup>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isoelectricPointCheckbox}
                    onChange={handleChangeIsoelectricPointCheckbox}
                  />
                }
                label="Isoelectric Point"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={lengthCheckbox}
                    onChange={handleChangeLengthCheckbox}
                  />
                }
                label="Length"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={chargeCheckbox}
                    onChange={handleChangeChargeCheckbox}
                  />
                }
                label="Charge"
              />
            </FormGroup>
          </Stack>
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
