import { FormControl, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
  fastaText: string;
  setFastaText: Dispatch<SetStateAction<string>>;
  fileType: string;
}

export default function TextFieldFasta({
  fastaText,
  setFastaText,
  fileType,
}: Props) {
  const handleChangeFastaText = (e: ChangeEvent<HTMLInputElement>): void => {
    setFastaText(e.target.value);
  };

  return (
    <FormControl fullWidth sx={{ marginY: 1 }}>
      <TextField
        label="Enter Amino Acid sequences"
        multiline
        rows={11}
        sx={{ width: "100%" }}
        value={fastaText}
        onChange={handleChangeFastaText}
        disabled={fileType === "file"}
      />
    </FormControl>
  );
}
