import { Box } from "@mui/material";
import { IAlign } from "../../utils/interfaces";
import ProSeqViewer from "../pro_seq_viewer";

interface Props {
  result: IAlign[];
}

export default function MSAContent({ result }: Props) {
  return (
    <>
      <Box
        marginTop={3}
        boxShadow={4}
        sx={{
          maxWidth: {
            xs: "20rem",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%",
          },
        }}
      >
        <ProSeqViewer sequences={result} />
      </Box>
    </>
  );
}
