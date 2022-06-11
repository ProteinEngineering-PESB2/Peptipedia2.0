import { FormControl, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
  width: "100%",
});

export default function InputFileFasta() {
  return (
    <FormControl sx={{ marginY: 1 }}>
      <label htmlFor="contained-button-file" style={{ width: "100%" }}>
        <Input id="contained-button-file" type="file" />
        <Button
          variant="outlined"
          component="span"
          endIcon={<CloudUploadIcon />}
          sx={{ width: { xl: "12rem" } }}
        >
          upload fasta
        </Button>
      </label>
    </FormControl>
  );
}
