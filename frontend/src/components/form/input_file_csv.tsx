import { FormControl, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { PostData } from "../../utils/interfaces";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

const Input = styled("input")({
  display: "none",
  width: "100%",
});

interface Props {
  data: PostData;
  setData: Dispatch<SetStateAction<PostData>>;
}

export default function InputFileCSV({ data, setData }: Props) {
  const handleChangeCsvInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if (
      e.target !== null &&
      e.target.files !== null &&
      e.target.files.length === 1
    ) {
      let nameFile = e.target.files[0].name;

      if (e.target.files[0].name.length > 15) {
        nameFile = e.target.files[0].name.substring(0, 12) + "...";
      }

      setData({
        ...data,
        csvFile: e.target.files[0],
        csvFileName: nameFile,
      });
    }
  };

  return (
    <FormControl fullWidth>
      <label htmlFor="contained-button-file" style={{ width: "100%" }}>
        <Input
          id="contained-button-file"
          type="file"
          onChange={handleChangeCsvInput}
        />
        <Button
          variant="outlined"
          component="span"
          endIcon={<CloudUploadIcon />}
          sx={{
            width: {
              xl: "12rem",
              lg: "12rem",
              md: "12rem",
              sm: "12rem",
              xs: "100%",
            },
          }}
          color={data.csvFileName !== "" ? "success" : "primary"}
        >
          {data.csvFileName !== "" ? data.csvFileName : "Upload CSV"}
        </Button>
      </label>
    </FormControl>
  );
}
