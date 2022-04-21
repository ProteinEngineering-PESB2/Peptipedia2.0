import axios from "axios";

import { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import LoadingButton from "@mui/lab/LoadingButton";

import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { blast } from "../../../../services/alignments";

const Input = styled("input")({
  display: "none",
});

const Form = ({ setData, setError, setSeverity, setOpenSnackbar, setPath }) => {
  const [fileType, setFileType] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
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

  const onSubmit = async (e) => {
    e.preventDefault();

    let post;
    let res;

    setLoading(true);
    setData([]);

    if (fileType === "text") {
      post = {
        data: textInput,
      };
    } else if (fileType === "file") {
      post = new FormData();
      post.append("file", fileInput);
    }

    try {
      res = await blast(post);

      if (res.status) {
        setSeverity("error");
        setError(res.description);
        setLoading(false);
        setOpenSnackbar(true);
      } else {
        const { path } = res;

        const { data } = await axios.get(path);

        setLoading(false);
        setData(data);
        setPath(path);
      }
    } catch (error) {
      setSeverity("error");
      setError("Service not available");
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
            <RadioGroup
              row
              aria-labelledby="label-file-type"
              name="row-file-alignment-type"
            >
              <FormControlLabel
                checked={fileType === "text"}
                onChange={handleChangeFileType}
                value="text"
                control={<Radio />}
                label="Text"
              />
              <FormControlLabel
                checked={fileType === "file"}
                onChange={handleChangeFileType}
                value="file"
                control={<Radio />}
                label="File"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {fileType === "text" && (
          <Grid item xs={12}>
            <TextField
              label="Enter Amino Acid sequences"
              multiline
              rows={11}
              sx={{ width: "100%" }}
              onChange={handleChangeTextInput}
            />
          </Grid>
        )}
        {fileType === "file" && (
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
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
                  color={
                    fileInput
                      ? fileInput.name
                        ? "success"
                        : "primary"
                      : "primary"
                  }
                >
                  {fileInput
                    ? fileInput.name
                      ? fileInput.name
                      : "Upload Fasta"
                    : "Upload Fasta"}
                </Button>
              </label>
            </Stack>
          </Grid>
        )}
        <Grid item lg={3} md={4} xs={12} sx={{ marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {loading ? (
                <LoadingButton
                  loading
                  variant="contained"
                  sx={{ width: "100%", backgroundColor: "#2962ff" }}
                  size="medium"
                >
                  Loading{" "}
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={textInput === "" && (fileInput === null || fileInput === undefined)}
                  sx={{
                    width: "100%",
                    backgroundColor: "#2962ff",
                    ":hover": { backgroundColor: "#2962ff" },
                  }}
                  size="medium"
                >
                  run alignment
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
