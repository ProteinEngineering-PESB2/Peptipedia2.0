import { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { pfam } from "../../../../services/characterizations";

const Input = styled("input")({
  display: "none",
});

const Form = ({ setData, setOpenSnackbar, setError, setSeverity }) => {
  const [fileType, setFileType] = useState("text");
  const [fileInput, setFileInput] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useStateIfMounted(false);

  const handleChangeFileType = (e) => {
    setFileType(e.target.value);
    setFileInput(null);
    setTextInput("");
  };

  const handleChangeFileInput = (e) => {
    setFileInput(e.target.files[0]);
  };

  const handleChangeTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setData([]);

    let post;

    if (fileType === "text") {
      post = {
        data: textInput,
      };
    } else if (fileType === "file") {
      post = new FormData();
      post.append("file", fileInput);
    }

    try {
      const res = await pfam(post);

      if (res.status) {
        setSeverity("error");
        setError(res.description);
        setLoading(false);
        setOpenSnackbar(true);
      } else {
        setLoading(false);
        setData(res.result);
      }
    } catch (error) {
      setSeverity("error");
      setError("Service not available");
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  return (
    <>
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
          <Grid item lg={4} md={5.2} sm={5} xs={12}>
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
                  fileInput
                    ? fileInput.name
                      ? "success"
                      : "primary"
                    : "primary"
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
          <Grid item xs={12} sx={{ marginTop: 3 }}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={5.2} sm={5} xs={12}>
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
                      (fileInput === null || fileInput === undefined) &&
                      textInput === ""
                    }
                    sx={{
                      width: "100%",
                      backgroundColor: "#2962ff",
                      ":hover": { backgroundColor: "#2962ff" },
                    }}
                    size="medium"
                  >
                    run
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Form;
