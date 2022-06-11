import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PostData } from "../../utils/interfaces";

interface Props {
  data: PostData;
  setData: Dispatch<SetStateAction<PostData>>;
}

export default function InputFileType({ data, setData }: Props) {
  const handleChangeFileType = (e: ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, fileType: (e.target as HTMLInputElement).value });
  };

  return (
    <FormControl fullWidth>
      <FormLabel id="label-file-type">File Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="label-file-type"
        name="row-file-alignment-type"
        value={data.fileType}
        onChange={handleChangeFileType}
      >
        <FormControlLabel
          value="text"
          control={<Radio />}
          label="Text"
          checked={data.fileType === "text"}
        />
        <FormControlLabel
          value="file"
          control={<Radio />}
          label="File"
          checked={data.fileType === "file"}
        />
      </RadioGroup>
    </FormControl>
  );
}
