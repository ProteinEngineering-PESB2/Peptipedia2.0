import { Box } from "@mui/material";
import { useState } from "react";
import BlackdropComponent from "../../components/backdrop_component";
import ButtonDownloadPrimary from "../button_download_primary";

interface Props {
  path: string;
}

export default function AlignmentSequenceContent({ path }: Props) {
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
        />
      </Box>
    </>
  );
}
