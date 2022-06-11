import { FormControl, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FastaInputType } from "../../helpers/types";

const Input = styled("input")({
  display: "none",
  width: "100%",
});

interface Props {
  fastaInput: FastaInputType;
  setFastaInput: Dispatch<SetStateAction<FastaInputType>>;
  fileType: string;
}

export default function InputFileFasta({
  fastaInput,
  setFastaInput,
  fileType,
}: Props) {
  const handleChangeFastaInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setFastaInput(e.target.files![0]);
  };

  return (
    <FormControl sx={{ marginY: 1 }}>
      <label htmlFor="contained-button-file" style={{ width: "100%" }}>
        <Input
          id="contained-button-file"
          type="file"
          disabled={fileType === "text"}
          onChange={handleChangeFastaInput}
        />
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
