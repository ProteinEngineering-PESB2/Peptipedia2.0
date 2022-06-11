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
    if (e.target !== null && e.target.files !== null && e.target.files.length === 1) {
      let nameFile = e.target.files[0].name;

      if (e.target.files[0].name.length > 15) {
        nameFile = e.target.files[0].name.substring(0, 12) + "...";
      }

      setData({
        ...data,
        fastaFile: e.target.files[0],
        fastaFileName: nameFile,
      });
    }
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
          color={data.fastaFileName !== "" ? "success" : "primary"}
        >
          {data.fastaFileName !== "" ? data.fastaFileName : "Upload Fasta"}
        </Button>
      </label>
    </FormControl>
  );
}
