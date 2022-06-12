import { Box, Typography } from "@mui/material";
import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";
import AlignmentSequenceForm from "../components/alignment_sequence/alignment_sequence_form";
import AlignmentSequenceContent from "../components/alignment_sequence/alignment_sequence_content";
import { useState } from "react";
import { ITable } from "../utils/interfaces";
import { InitialValueTable } from "../utils/initial_values";

export default function AlignmentSequence() {
  const [path, setPath] = useState<string>("");
  const [table, setTable] = useState<ITable>(InitialValueTable);

  useHandleSection({ section: "alignment-sequence" });

  return (
    <Layout>
      <>
        <Box>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Alignment Sequence
          </Typography>
        </Box>

        <AlignmentSequenceForm setPath={setPath} setTable={setTable} />

        {path !== "" && table.columns.length > 0 && table.data.length > 0 && (
          <AlignmentSequenceContent path={path} table={table} />
        )}
      </>
    </Layout>
  );
}
