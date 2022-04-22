import Plot from "react-plotly.js";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useEffect, useState, useCallback } from "react";

import CircularLoading from "../CircularLoading";

const SupervisedLearningContent = ({
  data,
  selectedTaskType,
  setOpenSnackbar,
  setMessage,
  setSeverity,
}) => {
  const [dataHeatmap, setDataHeatmap] = useState([]);
  const [dataHeatmapTesting, setDataHeatmapTesting] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [dataBarTesting, setBarTesting] = useState([]);
  const [dataErrorBars, setDataErrorBars] = useState([]);
  const [dataScatter, setDataScatter] = useState([]);
  const [dataScatterTesting, setDataScatterTesting] = useState([]);
  const [dataBoxPlot, setDataBoxPlot] = useState([]);
  const [dataBoxPlotTesting, setDataBoxPlotTesting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const parseDataHeatmap = useCallback(() => {
    const array = [
      {
        x: data.result.confusion_matrix.x,
        y: data.result.confusion_matrix.y,
        z: data.result.confusion_matrix.z,
        type: "heatmap",
        hoverongaps: false,
      },
    ];

    if (data.result.confusion_matrix_testing) {
      const array_testing = [
        {
          x: data.result.confusion_matrix_testing.x,
          y: data.result.confusion_matrix_testing.y,
          z: data.result.confusion_matrix_testing.z,
          type: "heatmap",
          hoverongaps: false,
        },
      ];
      setDataHeatmapTesting(array_testing);
    }

    setDataHeatmap(array);
  }, [data]);

  const parseDataLearningCurve = useCallback(() => {
    // Areas
    const traceErrorTraining = {
      x: data.result.learning_curve.error_training.x,
      y: data.result.learning_curve.error_training.y,
      fill: "tozerox",
      fillcolor: "rgba(0,100,80,0.2)",
      line: { color: "transparent" },
      name: "Training",
      showlegend: false,
      type: "scatter",
    };

    const traceErrorTesting = {
      x: data.result.learning_curve.error_testing.x,
      y: data.result.learning_curve.error_testing.y,
      fill: "tozerox",
      fillcolor: "rgba(0,176,246,0.2)",
      line: { color: "transparent" },
      name: "Testing",
      showlegend: false,
      type: "scatter",
    };

    // Lineas
    const traceTraining = {
      x: data.result.learning_curve.training.x,
      y: data.result.learning_curve.training.y,
      line: { color: "rgb(0,100,80)" },
      mode: "lines",
      name: "Training",
      type: "scatter",
    };

    const traceTesting = {
      x: data.result.learning_curve.testing.x,
      y: data.result.learning_curve.testing.y,
      line: { color: "rgb(0,176,246)" },
      mode: "lines",
      name: "Testing",
      type: "scatter",
    };

    setDataErrorBars([
      traceErrorTraining,
      traceErrorTesting,
      traceTraining,
      traceTesting,
    ]);
  }, [data]);

  const parseDataSensibility = useCallback(() => {
    const traceSensibility = {
      x: data.result.analysis.categories,
      y: data.result.analysis.sensibility,
      name: "Sensibility",
      type: "bar",
    };

    const traceSensivity = {
      x: data.result.analysis.categories,
      y: data.result.analysis.sensitivity,
      name: "Sensitivity",
      type: "bar",
    };

    if (data.result.analysis_testing) {
      const traceSensibilityTesting = {
        x: data.result.analysis_testing.categories,
        y: data.result.analysis_testing.sensibility,
        name: "Sensibility",
        type: "bar",
      };

      const traceSensivityTesting = {
        x: data.result.analysis_testing.categories,
        y: data.result.analysis_testing.sensitivity,
        name: "Sensitivity",
        type: "bar",
      };

      setBarTesting([traceSensibilityTesting, traceSensivityTesting]);
    }

    setDataBar([traceSensibility, traceSensivity]);
  }, [data]);

  const parseDataScatter = useCallback(() => {
    const traceX = {
      x: data.result.scatter.x,
      y: data.result.scatter.y,
      mode: "markers",
      type: "scatter",
    };

    if (data.result.scatter_testing) {
      const traceXTesting = {
        x: data.result.scatter_testing.x,
        y: data.result.scatter_testing.y,
        mode: "markers",
        type: "scatter",
      };

      setDataScatterTesting([traceXTesting]);
    }

    setDataScatter([traceX]);
  }, [data]);

  const parseDataBoxPlot = useCallback(() => {
    const array = [
      {
        y: data.result.error_values,
        type: "box",
        boxpoints: "all",
      },
    ];

    if (data.result.error_values_testing) {
      const array_testing = [
        {
          y: data.result.error_values_testing,
          type: "box",
          boxpoints: "all",
        },
      ];

      setDataBoxPlotTesting(array_testing);
    }

    setDataBoxPlot(array);
  }, [data]);

  const downloadModel = async () => {
    setLoadingButton(true);
    try {
      const res = await axios.get(data.job_path, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "model.joblib");
      document.body.appendChild(link);
      link.click();

      setLoadingButton(false);
    } catch (error) {
      setSeverity("error");
      setMessage("Service not available");
      setOpenSnackbar(true);
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    if (selectedTaskType === "classification") {
      parseDataHeatmap();
      parseDataLearningCurve();
      parseDataSensibility();
    }
    if (selectedTaskType === "regression") {
      parseDataScatter();
      parseDataBoxPlot();
    }
    setLoading(false);
  }, [
    parseDataHeatmap,
    selectedTaskType,
    parseDataLearningCurve,
    parseDataSensibility,
    parseDataScatter,
    parseDataBoxPlot,
  ]);

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <Grid container spacing={3}>
          {selectedTaskType === "classification" && (
            <>
              <Grid item lg={2.5} md={2.8} xs={12}>
                {loadingButton ? (
                  <LoadingButton
                    loading
                    variant="contained"
                    color="primary"
                    size="medium"
                  >
                    Loading{" "}
                  </LoadingButton>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#2962ff",
                      ":hover": { backgroundColor: "#2962ff" },
                      width: "100%",
                    }}
                    onClick={downloadModel}
                  >
                    Download Model
                  </Button>
                )}
              </Grid>
              <Grid item lg={12} xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Performance
                </Typography>
              </Grid>
              <Grid item lg={6} md={8} xs={12}>
                <div className="table-responsive">
                  <table
                    className="table table-light table-hover text-center"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Accuracy</th>
                        {data.result.performance.f1 && <th>F1</th>}
                        {data.result.performance.f1_weighted && (
                          <th>F1 Weighted</th>
                        )}
                        {data.result.performance.recall && <th>Recall</th>}
                        {data.result.performance.recall_weighted && (
                          <th>Recall Weighted</th>
                        )}
                        {data.result.performance.precision && (
                          <th>Precision</th>
                        )}
                        {data.result.performance.precision_weighted && (
                          <th>Precision Weighted</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-active">
                        <td>{data.result.performance.accuracy}</td>
                        {data.result.performance.f1 && (
                          <td>{data.result.performance.f1}</td>
                        )}
                        {data.result.performance.f1_weighted && (
                          <td>{data.result.performance.f1_weighted}</td>
                        )}
                        {data.result.performance.recall && (
                          <td>{data.result.performance.recall}</td>
                        )}
                        {data.result.performance.recall_weighted && (
                          <td>{data.result.performance.recall_weighted}</td>
                        )}
                        {data.result.performance.precision && (
                          <td>{data.result.performance.precision}</td>
                        )}
                        {data.result.performance.precision_weighted && (
                          <td>{data.result.performance.precision_weighted}</td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Grid>
              {data.result.performance_testing && (
                <>
                  <Grid item lg={12} xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Performance Testing
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={8} xs={12}>
                    <div className="table-responsive">
                      <table
                        className="table table-light table-hover text-center"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Accuracy</th>
                            {data.result.performance_testing.f1 && <th>F1</th>}
                            {data.result.performance_testing.f1_weighted && (
                              <th>F1 Weighted</th>
                            )}
                            {data.result.performance_testing.recall && (
                              <th>Recall</th>
                            )}
                            {data.result.performance_testing
                              .recall_weighted && <th>Recall Weighted</th>}
                            {data.result.performance_testing.precision && (
                              <th>Precision</th>
                            )}
                            {data.result.performance_testing
                              .precision_weighted && (
                              <th>Precision Weighted</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-active">
                            <td>{data.result.performance_testing.accuracy}</td>
                            {data.result.performance_testing.f1 && (
                              <td>{data.result.performance_testing.f1}</td>
                            )}
                            {data.result.performance_testing.f1_weighted && (
                              <td>
                                {data.result.performance_testing.f1_weighted}
                              </td>
                            )}
                            {data.result.performance_testing.recall && (
                              <td>{data.result.performance_testing.recall}</td>
                            )}
                            {data.result.performance_testing
                              .recall_weighted && (
                              <td>
                                {
                                  data.result.performance_testing
                                    .recall_weighted
                                }
                              </td>
                            )}
                            {data.result.performance_testing.precision && (
                              <td>
                                {data.result.performance_testing.precision}
                              </td>
                            )}
                            {data.result.performance_testing
                              .precision_weighted && (
                              <td>
                                {
                                  data.result.performance_testing
                                    .precision_weighted
                                }
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Grid>
                </>
              )}
              <Grid item lg={12} xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Confusion Matrix
                </Typography>
              </Grid>
              <Grid
                item
                lg={data.result.confusion_matrix_testing ? 6 : 12}
                md={data.result.confusion_matrix_testing ? 6 : 12}
                xs={12}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
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
                </Paper>
              </Grid>
              {data.result.confusion_matrix_testing && (
                <>
                  <Grid item lg={6} md={6} xs={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                      }}
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
                    </Paper>
                  </Grid>
                </>
              )}
              <Grid item lg={12} xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Learning Curve
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
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
                          data.result.learning_curve.training.x[0],
                          data.result.learning_curve.training.x[
                            data.result.learning_curve.training.x.length - 1
                          ],
                        ],
                      },
                      yaxis: { title: "Score" },
                    }}
                    useResizeHandler
                    className="w-full h-full"
                  />
                </Paper>
              </Grid>
              <Grid item lg={12} xs={12} marginTop={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Sensibility Analysis
                </Typography>
              </Grid>
              <Grid
                item
                lg={data.result.analysis_testing ? 6 : 12}
                md={data.result.analysis_testing ? 6 : 12}
                xs={12}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
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
                </Paper>
              </Grid>
              {data.result.analysis_testing && (
                <Grid item lg={6} md={6} xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
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
                  </Paper>
                </Grid>
              )}
            </>
          )}
          {selectedTaskType === "regression" && (
            <>
              <Grid item lg={2.5} md={3} xs={12}>
                {loadingButton ? (
                  <LoadingButton
                    loading
                    variant="contained"
                    color="primary"
                    size="medium"
                  >
                    Loading{" "}
                  </LoadingButton>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#2962ff",
                      ":hover": { backgroundColor: "#2962ff" },
                      width: "100%",
                    }}
                    onClick={downloadModel}
                  >
                    Download Model
                  </Button>
                )}
              </Grid>
              <Grid item lg={12} xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Correlation
                </Typography>
              </Grid>
              <Grid item lg={6} md={8} xs={12}>
                <div className="table-responsive">
                  <table
                    className="table table-hover text-center table-striped"
                    style={{ width: "100%", fontWeight: "bold" }}
                  >
                    <thead>
                      <tr>
                        <th>Metric Name</th>
                        <th>Metric Value</th>
                        <th>P-value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-active">
                        <td>Kendall</td>
                        <td>{data.result.corr.kendall.kendalltau}</td>
                        <td>{data.result.corr.kendall.pvalue}</td>
                      </tr>
                      {data.result.corr_testing && (
                        <tr className="table-active">
                          <td>Kendall Testing</td>
                          <td>{data.result.corr_testing.kendall.kendalltau}</td>
                          <td>{data.result.corr_testing.kendall.pvalue}</td>
                        </tr>
                      )}
                      <tr className="table-active">
                        <td>Pearson</td>
                        <td>{data.result.corr.pearson.pearsonr}</td>
                        <td>{data.result.corr.pearson.pvalue}</td>
                      </tr>
                      {data.result.corr_testing && (
                        <tr className="table-active">
                          <td>Kendall Testing</td>
                          <td>{data.result.corr_testing.pearson.pearsonr}</td>
                          <td>{data.result.corr_testing.pearson.pvalue}</td>
                        </tr>
                      )}
                      <tr className="table-active">
                        <td>Spearman</td>
                        <td>{data.result.corr.spearman.spearmanr}</td>
                        <td>{data.result.corr.spearman.pvalue}</td>
                      </tr>
                      {data.result.corr_testing && (
                        <tr className="table-active">
                          <td>Kendall Testing</td>
                          <td>{data.result.corr_testing.spearman.spearmanr}</td>
                          <td>{data.result.corr_testing.spearman.pvalue}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Grid>
              <Grid item lg={12} xs={12} marginTop={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Performance
                </Typography>
              </Grid>
              <Grid
                item
                lg={data.result.performance_testing ? 12 : 6}
                md={data.result.performance_testing ? 12 : 6}
                xs={12}
              >
                <div className="table-responsive">
                  <table
                    className="table table-light table-hover text-center"
                    style={{ width: "100%", fontWeight: "bold" }}
                  >
                    <thead>
                      <tr>
                        <th>Negative Median Absolute Error</th>
                        {data.result.performance_testing && (
                          <th>Negative Median Absolute Error Testing</th>
                        )}
                        <th>Negative Root Mean Squared Error</th>
                        {data.result.performance_testing && (
                          <th>Negative Root Mean Squared Error Testing</th>
                        )}
                        <th>R2</th>
                        {data.result.performance_testing && <th>R2 Testing</th>}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-active">
                        <td>
                          {data.result.performance.neg_median_absolute_error}
                        </td>
                        {data.result.performance_testing && (
                          <td>
                            {
                              data.result.performance_testing
                                .neg_median_absolute_error
                            }
                          </td>
                        )}
                        <td>
                          {data.result.performance.neg_root_mean_squared_error}
                        </td>
                        {data.result.performance_testing && (
                          <td>
                            {
                              data.result.performance_testing
                                .neg_root_mean_squared_error
                            }
                          </td>
                        )}
                        <td>{data.result.performance.r2}</td>
                        {data.result.performance_testing && (
                          <td>{data.result.performance_testing.r2}</td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Grid>
              <Grid item lg={12} xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Scatter
                </Typography>
              </Grid>
              <Grid
                item
                lg={data.result.scatter_testing ? 6 : 12}
                md={data.result.scatter_testing ? 6 : 12}
                xs={12}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Plot
                    data={dataScatter}
                    layout={{
                      autosize: true,
                      height: 430,
                      xaxis: { title: "Real Values" },
                      yaxis: { title: "Predicted Values" },
                      title: "Scatter Plot",
                    }}
                    useResizeHandler
                    className="w-full h-full"
                  />
                </Paper>
              </Grid>
              {data.result.scatter_testing && (
                <Grid item lg={6} md={6} xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Plot
                      data={dataScatterTesting}
                      layout={{
                        autosize: true,
                        height: 430,
                        xaxis: { title: "Real Values" },
                        yaxis: { title: "Predicted Values" },
                        title: "Scatter Plot Testing",
                      }}
                      useResizeHandler
                      className="w-full h-full"
                    />
                  </Paper>
                </Grid>
              )}
              <Grid item lg={12} xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Error Plot
                </Typography>
              </Grid>
              <Grid
                item
                lg={data.result.error_values_testing ? 6 : 12}
                md={data.result.error_values_testing ? 6 : 12}
                xs={12}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Plot
                    data={dataBoxPlot}
                    layout={{
                      autosize: true,
                      height: 430,
                      title: "Box Plot",
                    }}
                    useResizeHandler
                    className="w-full h-full"
                  />
                </Paper>
              </Grid>
              {data.result.error_values_testing && (
                <Grid item lg={6} md={6} xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Plot
                      data={dataBoxPlotTesting}
                      layout={{
                        autosize: true,
                        height: 430,
                        title: "Box Plot Testing",
                      }}
                      useResizeHandler
                      className="w-full h-full"
                    />
                  </Paper>
                </Grid>
              )}
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default SupervisedLearningContent;
