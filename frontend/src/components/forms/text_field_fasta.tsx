import { FormControl, TextField } from "@mui/material";

export default function TextFieldFasta() {
  return (
    <FormControl fullWidth sx={{ marginY: 1 }}>
      <TextField
        label="Enter Amino Acid sequences"
        multiline
        rows={11}
        sx={{ width: "100%" }}
      />
    </FormControl>
  );
}
