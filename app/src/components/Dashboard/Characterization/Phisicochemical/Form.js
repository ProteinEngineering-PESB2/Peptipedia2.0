import { useState } from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";

import LoadingButton from "@mui/lab/LoadingButton";

import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { phisicochemical } from "../../../../services/characterizations";

const Input = styled("input")({
  display: "none",
});

const Form = ({ setData, setColumns }) => {
  const [fileType, setFileType] = useState("text");
  const [fileInput, setFileInput] = useState(null);
  const [lengthCheckbox, setLengthCheckbox] = useState(true);
  const [molecularWeightCheckbox, setMolecularWeightCheckbox] = useState(true);
  const [isoelectricPointCheckbox, setIsoelectricPointCheckbox] =
    useState(true);
  const [chargeDensityCheckbox, setChargeDensityCheckbox] = useState(true);
  const [chargeCheckbox, setChargeCheckbox] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeFileType = (e) => {
    setFileType(e.target.value);
  };

  const handleChangeFileInput = (e) => {
    setFileInput(e.target.files[0]);
  };

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

    let columns = [];

    columns.push("Id");
    if (lengthCheckbox) columns.push("Length");
    if (molecularWeightCheckbox) columns.push("Molecular Weight");
    if (isoelectricPointCheckbox) columns.push("Isoelectric Point");
    if (chargeDensityCheckbox) columns.push("Charge Density");
    if (chargeCheckbox) columns.push("Charge");

    setColumns(columns);

    let post;
    let res;

    if (fileType === "text") {
      post = {
        data: textInput,
        options: {
          length: lengthCheckbox ? 1 : 0,
          molecular_weight: molecularWeightCheckbox ? 1 : 0,
          isoelectric_point: isoelectricPointCheckbox ? 1 : 0,
          charge_density: chargeDensityCheckbox ? 1 : 0,
          charge: chargeCheckbox ? 1 : 0,
        },
      };
    } else if (fileType === "file") {
      const options = new Blob([
        JSON.stringify({
          length: lengthCheckbox ? 1 : 0,
          molecular_weight: molecularWeightCheckbox ? 1 : 0,
          isoelectric_point: isoelectricPointCheckbox ? 1 : 0,
          charge_density: chargeDensityCheckbox ? 1 : 0,
          charge: chargeCheckbox ? 1 : 0,
        }),
      ]);

      post = new FormData()
      post.append("file", fileInput)
      post.append("options", options)
    }

    res = await phisicochemical(post);

    let newData = [];
    res.forEach((r) => {
      let array = [];
      array.push(r.id);
      if (r.length) array.push(r.length);
      if (r.molecular_weight) array.push(r.molecular_weight);
      if (r.isoelectric_point) array.push(r.isoelectric_point);
      if (r.charge_density) array.push(r.charge_density);
      if (r.charge) array.push(r.charge);

      newData.push(array);
    });

    setLoading(false);
    setData(newData);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="label-file-type">File Type</FormLabel>
            <RadioGroup row aria-labelledby="label-file-type">
              <FormControlLabel
                label="Text"
                control={<Radio />}
                value="text"
                checked={fileType === "text"}
                onChange={handleChangeFileType}
              />
              <FormControlLabel
                label="File"
                control={<Radio />}
                value="file"
                checked={fileType === "file"}
                onChange={handleChangeFileType}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {fileType === "text" && (
          <Grid item xs={12}>
            <TextField
              label="Enter Amino Acid sequences"
              multiline
              rows={5}
              sx={{ width: "100%" }}
              onChange={handleChangeTextInput}
            />
          </Grid>
        )}
        {fileType === "file" && (
          <Grid item xs={12}>
            <label htmlFor="contained-button-file">
              <Input
                id="contained-button-file"
                type="file"
                onChange={handleChangeFileInput}
              />
              <Button
                variant="outlined"
                component="span"
                endIcon={<CloudUploadIcon />}
              >
                Upload Fasta
              </Button>
            </label>
          </Grid>
        )}
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
