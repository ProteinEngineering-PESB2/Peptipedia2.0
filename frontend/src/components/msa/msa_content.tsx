import { Box } from "@mui/material";
import { IAlign } from "../../utils/interfaces";
import ProSeqViewer from "../pro_seq_viewer";

interface Props {
  result: IAlign[];
}

export default function MSAContent({ result }: Props) {
  return (
    <>
      <Box marginTop={3}>
        <ProSeqViewer sequences={result} />
      </Box>
    </>
  );
}
