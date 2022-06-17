import { Box } from "@mui/material";
import { useState } from "react";
import { IDataClassificationSupervisedLearning } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonDownloadPrimary from "../button_download_primary";

interface Props {
  result: IDataClassificationSupervisedLearning;
}

export default function SupervisedLearningContentClassification({
  result,
}: Props) {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  return (
    <>
      <BackdropComponent open={openBackdrop} percentage={percentage} />
      <Box marginTop={3}>
        <ButtonDownloadPrimary
          path={result.job_path}
          name="result.joblib"
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
        />
      </Box>
    </>
  );
}
