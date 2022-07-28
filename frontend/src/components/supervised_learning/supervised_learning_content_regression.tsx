import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Plot from "react-plotly.js";
import { useState } from "react";
import { IDataRegressionSupervisedLearning } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonDownloadPrimary from "../button_download_primary";
import { useScatterRegressionSupervisedLearning } from "../../hooks/useScatterRegressionSupervisedLearning";
import { useBoxPlotRegressionSupervisedLearning } from "../../hooks/useBoxPlotRegressionSupervisedLearning";
import { useSelectLinearClustering } from "../../hooks/useSelectLinearClustering";
import { usePCAClustering } from "../../hooks/usePCAClustering";
import SelectComponent from "../form/select_component";
import ScatterPlot from "../charts/scatter_plot";

interface Props {
  result: IDataRegressionSupervisedLearning;
}

export default function SupervisedLearningContentRegression({ result }: Props) {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [openBackdropPCA, setOpenBackdropPCA] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  const { dataScatter1 } = useScatterRegressionSupervisedLearning({
    data: result,
  });
  const { dataBoxPlot } = useBoxPlotRegressionSupervisedLearning({
    data: result,
  });
  const { selectedKernel, handleChangeSelectedKernel, kernels } =
    useSelectLinearClustering();
  const { handlePCA, pathPCA, dataScatter, xmin, xmax, ymin, ymax } =
    usePCAClustering({
      is_normal: result.result.is_normal,
      kernel: selectedKernel,
      path: result.result.encoding_path,
      setOpenBackdropPCA,
    });

  return (
    <>
      <BackdropComponent open={openBackdrop} percentage={percentage} />
      <BackdropComponent open={openBackdropPCA} />
      <Box marginTop={3}>
        <ButtonDownloadPrimary
          name="result.joblib"
          path={result.job_path}
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
          title="model"
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xl={7} lg={8} md={10} sm={12} xs={12}>
          <Box marginTop={3} boxShadow={4}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Metric Name</TableCell>
                    <TableCell>Metric Value</TableCell>
                    <TableCell>P-value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Kendall</TableCell>
                    <TableCell>
                      {result.result.corr.kendall.kendalltau}
                    </TableCell>
                    <TableCell>{result.result.corr.kendall.pvalue}</TableCell>
                  </TableRow>
                  {result.result.corr_testing && (
                    <TableRow>
                      <TableCell>Kendall Testing</TableCell>
                      <TableCell>
                        {result.result.corr_testing.kendall.kendalltau}
                      </TableCell>
                      <TableCell>
                        {result.result.corr_testing.kendall.pvalue}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell>Pearson</TableCell>
                    <TableCell>{result.result.corr.pearson.pearsonr}</TableCell>
                    <TableCell>{result.result.corr.pearson.pvalue}</TableCell>
                  </TableRow>
                  {result.result.corr_testing && (
                    <TableRow>
                      <TableCell>Kendall Testing</TableCell>
                      <TableCell>
                        {result.result.corr_testing.pearson.pearsonr}
                      </TableCell>
                      <TableCell>
                        {result.result.corr_testing.pearson.pvalue}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell>Spearman</TableCell>
                    <TableCell>
                      {result.result.corr.spearman.spearmanr}
                    </TableCell>
                    <TableCell>{result.result.corr.spearman.pvalue}</TableCell>
                  </TableRow>
                  {result.result.corr_testing && (
                    <TableRow>
                      <TableCell>Kendall Testing</TableCell>
                      <TableCell>
                        {result.result.corr_testing.spearman.spearmanr}
                      </TableCell>
                      <TableCell>
                        {result.result.corr_testing.spearman.pvalue}
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
        <Grid item xl={7} lg={8} md={10} sm={12} xs={12}>
          <Box marginTop={3} boxShadow={4}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Set</TableCell>

                    <TableCell>Negative Median Absolute Error</TableCell>
                    <TableCell>Negative Root Mean Squared Error</TableCell>
                    <TableCell>R2</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.result.performance && (
                    <TableRow>
                      <TableCell>Training</TableCell>
                      <TableCell>
                        {result.result.performance.neg_median_absolute_error}
                      </TableCell>
                      <TableCell>
                        {result.result.performance.neg_root_mean_squared_error}
                      </TableCell>
                      <TableCell>{result.result.performance.r2}</TableCell>
                    </TableRow>
                  )}
                  {result.result.performance_testing && (
                    <TableRow>
                      <TableCell>Testing</TableCell>
                      <TableCell>
                        {
                          result.result.performance_testing
                            .neg_median_absolute_error
                        }
                      </TableCell>
                      <TableCell>
                        {
                          result.result.performance_testing
                            .neg_root_mean_squared_error
                        }
                      </TableCell>
                      <TableCell>
                        {result.result.performance_testing.r2}
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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            boxShadow={4}
            marginTop={4}
          >
            <Plot
              data={dataScatter1}
              layout={{
                autosize: true,
                height: 430,
                xaxis: { title: "Real Values" },
                yaxis: { title: "Predicted Values" },
                title: "Scatter Plot",
                font: {
                  size: 15,
                },
              }}
              config={{ responsive: true }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            boxShadow={4}
            marginTop={4}
          >
            <Plot
              data={dataBoxPlot}
              layout={{
                autosize: true,
                height: 430,
                title: "Error Plot",
                font: {
                  size: 15,
                },
              }}
              config={{ responsive: true }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box marginTop={3} boxShadow={4}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2}>
            <Grid item xl={1.5} lg={2} md={3} sm={6} xs={6}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  backgroundColor: "#2962ff",
                  ":hover": { backgroundColor: "#2962ff" },
                  height: "100%",
                  width: "100%",
                }}
                onClick={handlePCA}
              >
                Apply PCA
              </Button>
            </Grid>
            <Grid item xl={1.5} lg={2} md={3} sm={6} xs={6}>
              <SelectComponent
                title="Kernel"
                items={kernels}
                handleChange={handleChangeSelectedKernel}
                value={selectedKernel}
              />
            </Grid>
          </Grid>
          {pathPCA !== "" && (
            <>
              <Box
                marginTop={3}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <ScatterPlot
                  title="Clustering with PCA"
                  data={dataScatter}
                  x_min={xmin}
                  x_max={xmax}
                  y_min={ymin}
                  y_max={ymax}
                />
              </Box>
              <Box marginTop={3}>
                <ButtonDownloadPrimary
                  path={pathPCA}
                  name="result.csv"
                  setOpenBackdrop={setOpenBackdrop}
                  setPercentage={setPercentage}
                  title="pca"
                />
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
}
