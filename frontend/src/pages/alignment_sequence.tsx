import { Box } from "@mui/material";
import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";
import AlignmentSequenceForm from "../components/alignment_sequence/alignment_sequence_form";
import AlignmentSequenceContent from "../components/alignment_sequence/alignment_sequence_content";
import { useState } from "react";
import { IAlign, ITable } from "../utils/interfaces";
import { InitialValueTable } from "../utils/initial_values";
import SectionTitle from "../components/section_title";

export default function AlignmentSequence() {
  const [path, setPath] = useState<string>("");
  const [table, setTable] = useState<ITable>(InitialValueTable);
  const [sequences, setSequences] = useState<IAlign[]>([]);

  useHandleSection({ section: "alignment-sequence" });

  return (
    <Layout>
      <>
        <Box>
          <SectionTitle title="Alignment Sequence"/>
        </Box>

        <AlignmentSequenceForm
          setPath={setPath}
          setTable={setTable}
          setSequences={setSequences}
        />

        {path !== "" && table.columns.length > 0 && table.data.length > 0 && (
          <AlignmentSequenceContent
            path={path}
            table={table}
            sequences={sequences}
          />
        )}
      </>
    </Layout>
  );
}
