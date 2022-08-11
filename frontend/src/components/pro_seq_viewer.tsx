import { Paper } from "@mui/material";
import { useProSeqViewer } from "../hooks/useProSeqViewer";
import { IOneAlign } from "../utils/interfaces";

interface Props {
  sequences: IOneAlign[];
  color?: boolean
}

export default function ProSeqViewer({ sequences, color }: Props) {
  useProSeqViewer({ sequences, color });

  return (
    <>
      {sequences.length > 0 && (
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            maxWidth: {
              xs: "20rem",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "100%",
            },
          }}
        >
          <div id="psv"></div>
        </Paper>
      )}
    </>
  );
}
