import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function InputFileType() {
  return (
    <FormControl fullWidth>
      <FormLabel id="label-file-type">File Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="label-file-type"
        name="row-file-alignment-type"
      >
        <FormControlLabel value="text" control={<Radio />} label="Text" />
        <FormControlLabel value="file" control={<Radio />} label="File" />
      </RadioGroup>
    </FormControl>
  );
}
