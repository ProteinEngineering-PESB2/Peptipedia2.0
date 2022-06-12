import { Box } from "@mui/material";
import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";
import { useState } from "react";
import Downloads from "../components/database/downloads";
import BackdropComponent from "../components/backdrop_component";
import SectionTitle from "../components/section_title";

export default function Database() {
  const [percentage, setPercentage] = useState<number>(0);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  useHandleSection({ section: "database" });

  return (
    <Layout>
      <>
        <BackdropComponent open={openBackdrop} percentage={percentage} />
        <Box>
          <SectionTitle title="Database"/>
        </Box>
        <Downloads
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
        />
      </>
    </Layout>
  );
}
