import { FormControl, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PostData } from "../../utils/interfaces";

const Input = styled("input")({
  display: "none",
  width: "100%",
});

interface Props {
  data: PostData;
  setData: Dispatch<SetStateAction<PostData>>;
}

export default function InputFileFasta({ data, setData }: Props) {
  const handleChangeFastaInput = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.files[0].name)
    setData({ ...data, fastaInput: e.target.files![0] });
  };

  return (
    <FormControl sx={{ marginY: 1 }}>
      <label htmlFor="contained-button-file" style={{ width: "100%" }}>
        <Input
          id="contained-button-file"
          type="file"
          disabled={data.fileType === "text"}
          onChange={handleChangeFastaInput}
        />
        <Button
          variant="outlined"
          component="span"
          endIcon={<CloudUploadIcon />}
          sx={{ width: { xl: "12rem" } }}
          disabled={data.fileType === "text"}
        >
          Upload Fasta
        </Button>
      </label>
    </FormControl>
  );
}
