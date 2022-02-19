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

const Form = ({ setData, setColumns, setHeaders }) => {
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

    columns.push({ field: "id", sortable: true, filter: true });
    if (lengthCheckbox)
      columns.push({ field: "length", sortable: true, filter: true });
    if (molecularWeightCheckbox)
      columns.push({ field: "molecular_weight", sortable: true, filter: true });
    if (isoelectricPointCheckbox)
      columns.push({
        field: "isoelectric_point",
        sortable: true,
        filter: true,
      });
    if (chargeDensityCheckbox)
      columns.push({ field: "charge_density", sortable: true, filter: true });
    if (chargeCheckbox)
      columns.push({ field: "charge", sortable: true, filter: true });

    let headers = [];

    headers.push({ label: "Sequence", key: "id" });
    if (lengthCheckbox) headers.push({ label: "Length", key: "length" });
    if (molecularWeightCheckbox)
      headers.push({ label: "Molecular Weight", key: "molecular_weight" });
    if (isoelectricPointCheckbox)
      headers.push({ label: "Isoelectric Point", key: "isoelectric_point" });
    if (chargeDensityCheckbox)
      headers.push({ label: "Charge Density", key: "charge_density" });
    if (chargeCheckbox) headers.push({ label: "Charge", key: "charge" });

    setColumns(columns);
    setHeaders(headers);

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
            <FormControlLabel
              control={
                <Checkbox
                  checked={chargeCheckbox}
                  onChange={handleChangeChargeCheckbox}
                />
              }
              label="Charge"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={lengthCheckbox}
                  onChange={handleChangeLengthCheckbox}
                />
              }
              label="Length"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isoelectricPointCheckbox}
                  onChange={handleChangeIsoelectricPointCheckbox}
                />
              }
              label="Isoelectric Point"
            />
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
