import { Box, Paper } from "@mui/material";
import { useEffect } from "react";
import { useProSeqViewer } from "../../hooks/useProSeqViewer";
import { IAlign } from "../../utils/interfaces";

interface Props {
  result: IAlign[];
}

export default function MSAContent({ result }: Props) {
  useProSeqViewer({ sequences: result });

  return (
    <>
      <Box
        marginTop={3}
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
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div id="psv"></div>
        </Paper>
      </Box>
    </>
  );
}
