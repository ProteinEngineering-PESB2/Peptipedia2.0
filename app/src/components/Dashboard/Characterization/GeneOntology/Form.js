import { useState } from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";

import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { geneOntology } from "../../../../services/characterizations";

const Input = styled("input")({
  display: "none",
});

const Form = ({ setData, setOpenSnackbar, setError, setSeverity }) => {
  const [fileType, setFileType] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [molecularFunctionCheckbox, setMolecularFunctionCheckbox] =
    useState(true);
  const [biologicalProcessCheckbox, setBiologicalProcessCheckbox] =
    useState(true);
  const [celularComponentCheckbox, setCelularComponentCheckbox] =
    useState(true);
  const [loading, setLoading] = useState(false);

  const handleChangeFileType = (e) => {
    setFileType(e.target.value);
  };

  const handleChangeTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const handleChangeFileInput = (e) => {
    setFileInput(e.target.files[0]);
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

    setLoading(true);

    let post;

    if (fileType === "text") {
      post = {
        data: textInput,
        options: {
          molecular_function: molecularFunctionCheckbox ? 1 : 0,
          biological_process: biologicalProcessCheckbox ? 1 : 0,
          celular_component: celularComponentCheckbox ? 1 : 0,
        },
      };
    } else if (fileType === "file") {
      const options = new Blob([
        JSON.stringify({
          molecular_function: molecularFunctionCheckbox ? 1 : 0,
          biological_process: biologicalProcessCheckbox ? 1 : 0,
          celular_component: celularComponentCheckbox ? 1 : 0,
        }),
      ]);

      post = new FormData();
      post.append("file", fileInput);
      post.append("options", options);
    }

    try {
      const res = await geneOntology(post);

      setData(res);

      setLoading(false);
    } catch (error) {
      setSeverity("error");
      setError("error in characterizing the sequences");
      setOpenSnackbar(true);
      setLoading(false);
    }
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
            <Button
              type="submit"
              variant="contained"
              disabled={
                molecularFunctionCheckbox === false &&
                biologicalProcessCheckbox === false &&
                celularComponentCheckbox === false
              }
            >
              run characterization
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
