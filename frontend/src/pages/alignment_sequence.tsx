import {
  Box,
  Typography,
} from "@mui/material";
import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";
import AlignmentSequenceForm from "../components/alignment_sequence/alignment_sequence_form";

export default function AlignmentSequence() {
  useHandleSection({ section: "alignment-sequence" });

  return (
    <Layout>
      <>
        <Box>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Alignment Sequence
          </Typography>
        </Box>

        <AlignmentSequenceForm/>
      </>
    </Layout>
  );
}
