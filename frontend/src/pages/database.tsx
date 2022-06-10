import { Box, Typography } from "@mui/material";
import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";
import { useState } from "react";
import Downloads from "../components/database/downloads";
import BackdropComponent from "../components/backdrop_component";

export default function Database() {
  const [percentage, setPercentage] = useState<number>(0);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  useHandleSection({ section: "database" });

  return (
    <Layout>
      <>
        <BackdropComponent open={openBackdrop} percentage={percentage} />
        <Box>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Peptipedia Database
          </Typography>
        </Box>
        <Downloads
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
        />
      </>
    </Layout>
  );
}
