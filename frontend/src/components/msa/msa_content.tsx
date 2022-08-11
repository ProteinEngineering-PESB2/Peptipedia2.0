import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { IAlign } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonDownloadPrimary from "../button_download_primary";
import ProSeqViewer from "../pro_seq_viewer";

const env = import.meta.env
const backendURL = env.PROD ? env.VITE_BACKEND_BASEURL : "http://localhost:8001";

interface Props {
  result: IAlign;
}

export default function MSAContent({ result }: Props) {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  return (
    <>
      <BackdropComponent open={openBackdrop} percentage={percentage} />
      <Box marginTop={3}>
        <ButtonDownloadPrimary
          path={result.output_file}
          name="msa.aln"
          title="MSA"
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
        />
      </Box>
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
        <ProSeqViewer sequences={result.alignment} />
      </Box>
      <Box marginTop={3}>
        <ButtonDownloadPrimary
          path={result.distances_file}
          name="distances_matrix.mat"
          title="Distances Matrix"
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
        />
      </Box>
      <Box marginTop={3} boxShadow={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            maxHeight: 700,
            overflowX: "scroll",
            overflowY: "scroll",
          }}
        >
          <img
            src={`${backendURL}${result.image_heatmap}`}
            alt="Distances Matrix"
            width="100%"
            height="100%"
          />
        </Paper>
      </Box>
      <Box marginTop={3} boxShadow={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            maxHeight: 800,
            overflowX: "scroll",
            overflowY: "scroll",
          }}
        >
          <img
            src={`${backendURL}${result.dendrogram}`}
            alt="Dendrogram"
            width="100%"
            height="100%"
          />
        </Paper>
      </Box>
    </>
  );
}
