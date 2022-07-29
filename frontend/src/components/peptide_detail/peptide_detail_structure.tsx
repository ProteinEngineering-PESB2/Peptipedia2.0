import { Box } from "@mui/material";
import useGetStructurePeptideDetail from "../../hooks/useGetStructurePeptideDetail";
import ProSeqViewer from "../pro_seq_viewer";

interface Props {
  peptideId: string | undefined;
}

export default function PeptideDetailStructure({ peptideId }: Props) {
  const { sequences } = useGetStructurePeptideDetail({ peptideId });

  return (
    <>
      <Box marginTop={3}>
        <div id="content-pdb" style={{ width: "100%" }}></div>
      </Box>
      {sequences.length > 0 && (
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
          {/* @ts-ignore */}
          <ProSeqViewer sequences={sequences} />
        </Box>
      )}
    </>
  );
}
