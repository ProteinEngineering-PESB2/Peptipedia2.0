import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { downloadFile } from "../services/downloadFile";

interface Props {
  path: string;
  name: string;
  setOpenBackdrop: Dispatch<SetStateAction<boolean>>;
  setPercentage: Dispatch<SetStateAction<number>>;
  title: string
}

export default function ButtonDownloadPrimary({
  path,
  name,
  setOpenBackdrop,
  setPercentage,
  title
}: Props) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#2962ff",
        ":hover": { backgroundColor: "#2962ff" },
      }}
      onClick={() =>
        downloadFile({
          url: path,
          name: name,
          setOpenBackdrop,
          setPercentage,
        })
      }
    >
      download {title}
    </Button>
  );
}
