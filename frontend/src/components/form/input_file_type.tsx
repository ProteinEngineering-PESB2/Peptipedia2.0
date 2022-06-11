import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
  fileType: string;
  setFileType: Dispatch<SetStateAction<string>>;
}

export default function InputFileType({ fileType, setFileType }: Props) {
  const handleChangeFileType = (e: ChangeEvent<HTMLInputElement>): void => {
    setFileType((e.target as HTMLInputElement).value);
  };

  return (
    <FormControl fullWidth>
      <FormLabel id="label-file-type">File Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="label-file-type"
        name="row-file-alignment-type"
        value={fileType}
        onChange={handleChangeFileType}
      >
        <FormControlLabel
          value="text"
          control={<Radio />}
          label="Text"
          checked={fileType === "text"}
        />
        <FormControlLabel
          value="file"
          control={<Radio />}
          label="File"
          checked={fileType === "file"}
        />
      </RadioGroup>
    </FormControl>
  );
}
