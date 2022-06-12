import { Box, Paper } from "@mui/material";
import { useEffect } from "react";
import { IAlign } from "../../utils/interfaces";
import { ProSeqViewer } from "proseqviewer/dist";

interface Props {
  result: IAlign[];
}

const options = {
  sequenceColor: "clustal",
  wrapLine: false,
  chunkSize: 20,
  viewerWidth: "100%"
};

export default function MSAContent({ result }: Props) {
  useEffect(() => {
    const psv = new ProSeqViewer("psv");
    psv.draw({ sequences: result, options });
  }, []);

  return (
    <>
      <Box marginTop={3} sx={{ maxWidth: { xs: "20.8rem", sm: "100%", md: "100%", lg: "100%", xl: "100%" } }}>
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
