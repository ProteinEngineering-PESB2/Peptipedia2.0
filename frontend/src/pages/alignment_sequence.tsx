import { Box } from "@mui/material";
import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";
import AlignmentSequenceForm from "../components/alignment_sequence/alignment_sequence_form";
import AlignmentSequenceContent from "../components/alignment_sequence/alignment_sequence_content";
import { useState } from "react";
import { IAlign, IOneAlign, ITable } from "../utils/interfaces";
import { InitialValueTable } from "../utils/initial_values";
import SectionTitle from "../components/section_title";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function AlignmentSequence() {
  const [path, setPath] = useState<string>("");
  const [table, setTable] = useState<ITable>(InitialValueTable);
  const [sequences, setSequences] = useState<IOneAlign[]>([]);

  useHandleSection({ section: "alignment-sequence" });
  useLoadingComponent();

  return (
    <Layout>
      <>
        <Box>
          <SectionTitle
            title="Alignment Sequence"
            description="Use of the BLAST (Basic Local Alignment Search Tool) algorithm against the Peptipedia database."
          />
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
