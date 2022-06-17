import {
  Box,
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";
import Plot from "react-plotly.js";
import { useState } from "react";
import { useHeatmapSupervisedLearning } from "../../hooks/useHeatmapSupervisedLearning";
import { IDataClassificationSupervisedLearning } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonDownloadPrimary from "../button_download_primary";
import { useLearningCurveSupervisedLearning } from "../../hooks/useLearningCurveSupervisedLearning";
import { useGroupedBarSupervisedLearning } from "../../hooks/useGroupedBarSupervisedLearning";

interface Props {
  result: IDataClassificationSupervisedLearning;
}

export default function SupervisedLearningContentClassification({
  result,
}: Props) {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  const { dataHeatmap, dataHeatmapTesting } = useHeatmapSupervisedLearning({
    result,
  });
  const { dataErrorBars } = useLearningCurveSupervisedLearning({
    data: result,
  });
  const { dataBar, dataBarTesting } = useGroupedBarSupervisedLearning({
    data: result,
  });

  return (
    <>
      <BackdropComponent open={openBackdrop} percentage={percentage} />
      <Box marginTop={3}>
        <ButtonDownloadPrimary
          path={result.job_path}
          name="result.joblib"
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
          title="model"
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box boxShadow={4} marginTop={3}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Set</TableCell>
                    <TableCell>Accuracy</TableCell>
                    <TableCell>F1 Weighted</TableCell>
                    <TableCell>Recall Weighted</TableCell>
                    <TableCell>Precision Weighted</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Training</TableCell>
                    <TableCell>{result.result.performance.accuracy}</TableCell>
                    <TableCell>
                      {result.result.performance.f1_weighted}
                    </TableCell>
                    <TableCell>
                      {result.result.performance.recall_weighted}
                    </TableCell>
                    <TableCell>
                      {result.result.performance.precision_weighted}
                    </TableCell>
                  </TableRow>
                  {result.result.performance_testing && (
                    <TableRow>
                      <TableCell>Testing</TableCell>
                      <TableCell>
                        {result.result.performance_testing.accuracy}
                      </TableCell>
                      <TableCell>
                        {result.result.performance_testing.f1_weighted}
                      </TableCell>
                      <TableCell>
                        {result.result.performance_testing.recall_weighted}
                      </TableCell>
                      <TableCell>
                        {result.result.performance_testing.precision_weighted}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Box
            marginTop={3}
            boxShadow={4}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Plot
              data={dataHeatmap}
              layout={{
                autosize: true,
                height: 430,
                title: "Confusion Matrix",
                xaxis: { title: "Real Values" },
                yaxis: { title: "Predicted Values" },
              }}
              useResizeHandler
              className="w-full h-full"
            />
          </Box>
        </Grid>
        {result.result.confusion_matrix_testing && (
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box
              marginTop={3}
              boxShadow={4}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Plot
                data={dataHeatmapTesting}
                layout={{
                  autosize: true,
                  height: 430,
                  title: "Confusion Matrix Testing",
                  xaxis: { title: "Real Values" },
                  yaxis: { title: "Predicted Values" },
                }}
                useResizeHandler
                className="w-full h-full"
              />
            </Box>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box
            marginTop={3}
            boxShadow={4}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Plot
              data={dataErrorBars}
              layout={{
                autosize: true,
                height: 430,
                title: "Learning Curve",
                xaxis: {
                  title: "Training Examples",
                  range: [
                    result.result.learning_curve.training.x[0],
                    result.result.learning_curve.training.x[
                      result.result.learning_curve.training.x.length - 1
                    ],
                  ],
                },
                yaxis: { title: "Score" },
              }}
              useResizeHandler
              className="w-full h-full"
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box
            marginTop={3}
            boxShadow={4}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Plot
              data={dataBar}
              layout={{
                autosize: true,
                height: 430,
                barmode: "group",
                title: "Sensibility Analysis",
              }}
              useResizeHandler
              className="w-full h-full"
            />
          </Box>
        </Grid>
        {result.result.analysis_testing && (
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box
              marginTop={3}
              boxShadow={4}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Plot
                data={dataBarTesting}
                layout={{
                  autosize: true,
                  height: 430,
                  barmode: "group",
                  title: "Sensibility Analysis Testing",
                }}
                useResizeHandler
                className="w-full h-full"
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}
