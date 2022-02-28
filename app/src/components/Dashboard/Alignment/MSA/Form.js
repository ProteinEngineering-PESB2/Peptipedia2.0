import { useState } from "react";

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
import SaveIcon from "@mui/icons-material/Save";

import { msa } from "../../../../services/alignments";

const Input = styled("input")({
  display: "none",
});

const Form = ({ setData, setError, setSeverity, setOpenSnackbar }) => {
  const [fileType, setFileType] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [loading, setLoading] = useState(false);

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
      res = await msa(post);

      let result = [];

      res.forEach((data) => {
        result.push({
          id: data.id,
          label: `${data.label.substring(0, 12)}`,
          sequence: data.sequence,
        });
      });

      setData(result);
      setLoading(false);
    } catch (error) {
      setSeverity("error");
      setError("Error aligning the sequences.");
      setOpenSnackbar(true)
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
              rows={5}
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
                >
                  Upload Fasta
                </Button>
              </label>
            </Stack>
          </Grid>
        )}
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
              disabled={textInput === "" && fileInput === null}
            >
              run alignment
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
