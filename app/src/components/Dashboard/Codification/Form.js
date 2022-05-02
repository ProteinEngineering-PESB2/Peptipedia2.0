import axios from "axios";

import { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { codification } from "../../../services/codifications";

const Input = styled("input")({
  display: "none",
});

const Form = ({ setOpenSnackbar, setMessage, setSeverity }) => {
  const [fileType, setFileType] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [oneHotEncodingCheckbox, setOneHotEncodingCheckbox] = useState(true);
  const [
    phisicochemicalPropertiesCheckbox,
    setPhisicochemicalPropertiesCheckbox,
  ] = useState(true);
  const [digitalSignalProcessingCheckbox, setDigitalSignalProcessingCheckbox] =
    useState(true);
  const [loading, setLoading] = useStateIfMounted(false);

  const handleChangeFileType = (e) => {
    setFileType(e.target.value);
    setTextInput("");
    setFileInput(null);
  };

  const handleChangeTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const handleChangeFileInput = (e) => {
    setFileInput(e.target.files[0]);
  };

  const handleChangeOneHotEncodingCheckbox = (e) => {
    setOneHotEncodingCheckbox(e.target.checked);
  };

  const handleChangePhisicochemicalPropertiesCheckbox = (e) => {
    setPhisicochemicalPropertiesCheckbox(e.target.checked);
    if (e.target.checked === false) setDigitalSignalProcessingCheckbox(false);
  };

  const handleChangeDigitalSignalProcessingCheckbox = (e) => {
    setDigitalSignalProcessingCheckbox(e.target.checked);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let post;

    if (fileType === "text") {
      post = {
        data: textInput,
        options: {
          one_hot_encoding: oneHotEncodingCheckbox ? 1 : 0,
          phisicochemical_properties: phisicochemicalPropertiesCheckbox ? 1 : 0,
          digital_signal_processing: digitalSignalProcessingCheckbox ? 1 : 0,
        },
      };
    } else if (fileType === "file") {
      const options = new Blob([
        JSON.stringify({
          one_hot_encoding: oneHotEncodingCheckbox ? 1 : 0,
          phisicochemical_properties: phisicochemicalPropertiesCheckbox ? 1 : 0,
          digital_signal_processing: digitalSignalProcessingCheckbox ? 1 : 0,
        }),
      ]);

      post = new FormData();
      post.append("file", fileInput);
      post.append("options", options);
    }

    try {
      const fileName = await codification(post);

      if (fileName.status) {
        setSeverity("error");
        setMessage(fileName.description);
        setLoading(false);
        setOpenSnackbar(true);
      } else {
        const res = await axios.get(`/files/${fileName.result}`, {
          responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "codifications.zip");
        document.body.appendChild(link);
        link.click();

        setSeverity("success");
        setMessage("Download completed");
        setOpenSnackbar(true);
        setLoading(false);
      }
    } catch (error) {
      setSeverity("error");
      setMessage("Service not available");
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
        <Grid item xs={12}>
          <TextField
            label="Enter Amino Acid sequences"
            multiline
            rows={11}
            sx={{ width: "100%" }}
            value={textInput}
            onChange={handleChangeTextInput}
            disabled={fileType === "file"}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item lg={3} md={4} sm={5} xs={12}>
          <label htmlFor="contained-button-file" style={{ width: "100%" }}>
            <Input
              id="contained-button-file"
              type="file"
              onChange={handleChangeFileInput}
              disabled={fileType === "text"}
            />
            <Button
              variant="outlined"
              component="span"
              endIcon={<CloudUploadIcon />}
              color={
                fileInput ? (fileInput.name ? "success" : "primary") : "primary"
              }
              disabled={fileType === "text"}
              sx={{ width: "100%" }}
            >
              {fileInput
                ? fileInput.name
                  ? fileInput.name
                  : "Upload Fasta"
                : "Upload Fasta"}
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={oneHotEncodingCheckbox}
                  onChange={handleChangeOneHotEncodingCheckbox}
                />
              }
              label="One Hot Encoding"
            ></FormControlLabel>
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={phisicochemicalPropertiesCheckbox}
                  onChange={handleChangePhisicochemicalPropertiesCheckbox}
                />
              }
              label="Physicochemical Properties"
            ></FormControlLabel>
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={digitalSignalProcessingCheckbox}
                  onChange={handleChangeDigitalSignalProcessingCheckbox}
                  disabled={phisicochemicalPropertiesCheckbox ? false : true}
                />
              }
              label="Digital Signal Processing"
            ></FormControlLabel>
          </FormGroup>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 3 }}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={4} sm={5} xs={12}>
              {loading ? (
                <LoadingButton
                  loading
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%" }}
                  size="medium"
                >
                  Loading{" "}
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    (oneHotEncodingCheckbox === false &&
                      phisicochemicalPropertiesCheckbox === false &&
                      digitalSignalProcessingCheckbox === false) ||
                    (textInput === "" &&
                      (fileInput === null || fileInput === undefined))
                  }
                  sx={{
                    width: "100%",
                    backgroundColor: "#2962ff",
                    ":hover": { backgroundColor: "#2962ff" },
                  }}
                  size="medium"
                >
                  Run
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
