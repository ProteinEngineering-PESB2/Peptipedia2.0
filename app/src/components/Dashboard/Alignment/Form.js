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

import { styled } from "@mui/material/styles";
import { InputLabel } from "@mui/material";

const Input = styled("input")({
  display: "none",
});

const Form = () => {
  const [alignmentType, setAlignmentType] = useState("blast");
  const [fileType, setFileType] = useState("text");

  const handleChangeAlignmentType = (e) => {
    setAlignmentType(e.target.value);
  };

  const handleChangeFileType = (e) => {
    setFileType(e.target.value);
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="label-alignment-type">Alignment Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="label-alignment-type"
              name="row-radio-alignment-type"
            >
              <FormControlLabel
                checked={alignmentType === "blast"}
                onChange={handleChangeAlignmentType}
                value="blast"
                control={<Radio />}
                label="Blast"
              />
              <FormControlLabel
                checked={alignmentType === "msa"}
                onChange={handleChangeAlignmentType}
                value="msa"
                control={<Radio />}
                label="MSA"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
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
            <InputLabel htmlFor="text-input" sx={{ mb: 1 }}>
              Enter Amino Acid Sequences
            </InputLabel>
            <TextField
              label="Enter Amino Acid sequences"
              id="text-input"
              multiline
              rows={5}
              sx={{ width: "100%" }}
            />
          </Grid>
        )}
        {fileType === "file" && (
          <Grid item xs={12}>
            <InputLabel htmlFor="file-input" sx={{ mb: 1 }}>
              Upload Fasta File
            </InputLabel>
          </Grid>
        )}
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Button variant="contained">run alignment</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
