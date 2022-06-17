import { Box } from "@mui/material";
import { useState } from "react";
import { IDataRegressionSupervisedLearning } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonDownloadPrimary from "../button_download_primary";

interface Props {
  result: IDataRegressionSupervisedLearning;
}

export default function SupervisedLearningContentRegression({ result }: Props) {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  return (
    <>
      <BackdropComponent open={openBackdrop} percentage={percentage} />
      <Box marginTop={3}>
        <ButtonDownloadPrimary
          name="result.joblib"
          path={result.job_path}
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
        />
      </Box>
    </>
  );
}
