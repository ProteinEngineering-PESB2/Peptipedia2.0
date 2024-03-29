import { Box } from "@mui/material";
import { useState } from "react";
import BlackdropComponent from "../../components/backdrop_component";
import { IAlign, IOneAlign, ITable } from "../../utils/interfaces";
import ButtonDownloadPrimary from "../button_download_primary";
import DataTable from "../datatable";
import ProSeqViewer from "../pro_seq_viewer";

interface Props {
  path: string;
  table: ITable;
  sequences: IOneAlign[];
}

export default function AlignmentSequenceContent({
  path,
  table,
  sequences,
}: Props) {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  return (
    <>
      <BlackdropComponent open={openBackdrop} percentage={percentage} />
      <Box marginTop={3}>
        <ButtonDownloadPrimary
          path={path}
          name="blast.txt"
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
          title="Blast"
        />
      </Box>
      <Box marginTop={3} boxShadow={4}>
        <DataTable title="Alignment Sequence Result" table={table} />
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
        <ProSeqViewer sequences={sequences} />
      </Box>
    </>
  );
}
