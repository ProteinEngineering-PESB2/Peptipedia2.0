import { FormControl, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { EnumFileType } from "../../utils/enums";
import { PostData } from "../../utils/interfaces";

interface Props {
  data: PostData;
  setData: Dispatch<SetStateAction<PostData>>;
  placeholder: string;
}

export default function TextFieldFasta({ data, setData, placeholder }: Props) {
  const handleChangeFastaText = (e: ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, fastaText: e.target.value });
  };

  return (
    <FormControl fullWidth sx={{ marginY: 1 }}>
      <TextField
        label="Enter Amino Acid sequences"
        multiline
        rows={11}
        placeholder={placeholder}
        sx={{ width: "100%" }}
        value={data.fastaText}
        onChange={handleChangeFastaText}
        disabled={data.fileType === EnumFileType.FILE}
      />
    </FormControl>
  );
}
