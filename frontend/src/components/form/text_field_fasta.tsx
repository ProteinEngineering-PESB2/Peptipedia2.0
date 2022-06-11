import { FormControl, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PostData } from "../../utils/interfaces";

interface Props {
  data: PostData;
  setData: Dispatch<SetStateAction<PostData>>;
}

export default function TextFieldFasta({ data, setData }: Props) {
  const handleChangeFastaText = (e: ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, fastaText: e.target.value });
  };

  return (
    <FormControl fullWidth sx={{ marginY: 1 }}>
      <TextField
        label="Enter Amino Acid sequences"
        multiline
        rows={11}
        sx={{ width: "100%" }}
        value={data.fastaText}
        onChange={handleChangeFastaText}
        disabled={data.fileType === "file"}
      />
    </FormControl>
  );
}
