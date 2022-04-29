import Plot from "react-plotly.js";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";

import { useEffect, useState, useCallback } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import { styled } from "@mui/system";

import CircularLoading from "../CircularLoading";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DataTable from "../DataTable";

const Input = styled("input")({
  display: "none",
  width: "100%",
});

const SupervisedLearningContent = ({
  data,
  selectedTaskType,
  setOpenSnackbar,
  setMessage,
  setSeverity,
  options,
}) => {
  const [dataHeatmap, setDataHeatmap] = useState([]);
  const [dataHeatmapTesting, setDataHeatmapTesting] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [dataBarTesting, setDataBarTesting] = useState([]);
  const [dataErrorBars, setDataErrorBars] = useState([]);
  const [dataScatter, setDataScatter] = useState([]);
  const [dataBoxPlot, setDataBoxPlot] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [showFormNewData, setShowFormNewData] = useState(false);
  const [fileType, setFileType] = useState("text");
  const [fileInputNew, setFileInputNew] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [loadingPredictNewData, setLoadingPredictNewData] =
    useStateIfMounted(false);
  const [columns, setColumns] = useStateIfMounted([]);
  const [dataTable, setDataTable] = useStateIfMounted([]);

  const handleChangeFileType = (e) => {
    setFileType(e.target.value);
    setTextInput("");
    setFileInputNew(null);
  };

  const handleChangeTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const handleChangeFileInputNew = (e) => {
    setFileInputNew(e.target.files[0]);
  };

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
    let traceSensibility = {
      x: data.result.analysis.categories,
      y: data.result.analysis.sensibility,
      name: "Sensibility",
      type: "bar",
    };

    let traceSensivity = {
      x: data.result.analysis.categories,
      y: data.result.analysis.sensitivity,
      name: "Sensitivity",
      type: "bar",
    };

    if (data.result.analysis_testing) {
      const traceSensibilityTesting = {
        x: data.result.analysis_testing.categories,
        y: data.result.analysis_testing.sensibility,
        name: "Sensibility Testing",
        type: "bar",
      };

      const traceSensivityTesting = {
        x: data.result.analysis_testing.categories,
        y: data.result.analysis_testing.sensitivity,
        name: "Sensitivity Testing",
        type: "bar",
      };

      setDataBarTesting([traceSensibilityTesting, traceSensivityTesting]);
    }
    setDataBar([traceSensibility, traceSensivity]);
  }, [data]);

  const parseDataScatter = useCallback(() => {
    let traceX = {
      x: data.result.scatter.x,
      y: data.result.scatter.y,
      mode: "markers",
      type: "scatter",
      name: "Training",
    };

    if (data.result.scatter_testing) {
      const traceXTesting = {
        x: data.result.scatter_testing.x,
        y: data.result.scatter_testing.y,
        mode: "markers",
        type: "scatter",
        name: "Testing",
      };

      setDataScatter([traceX, traceXTesting]);
    } else {
      setDataScatter([traceX]);
    }
  }, [data]);

  const parseDataBoxPlot = useCallback(() => {
    let array = {
      y: data.result.error_values,
      type: "box",
      boxpoints: "all",
      name: "Training",
    };

    if (data.result.error_values_testing) {
      const array_testing = {
        y: data.result.error_values_testing,
        type: "box",
        boxpoints: "all",
        name: "Testing",
      };

      setDataBoxPlot([array, array_testing]);
    } else {
      setDataBoxPlot([array]);
    }
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

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoadingPredictNewData(true);

    let post;

    if (fileType === "text") {
      if (options.encoding === "one_hot_encoding") {
        post = {
          data: textInput,
          options: {
            job_path: data.job_path,
            encoding: options.encoding,
          },
        };
      } else {
        post = {
          data: textInput,
          options: {
            job_path: data.job_path,
            encoding: options.encoding,
            selected_property: options.selected_property,
          },
        };
      }
    } else {
      let optionsRequest;
      if (options.encoding === "one_hot_encoding") {
        optionsRequest = new Blob([
          JSON.stringify({
            job_path: data.job_path,
            encoding: options.encoding,
          }),
        ]);
      } else {
        optionsRequest = new Blob([
          JSON.stringify({
            job_path: data.job_path,
            encoding: options.encoding,
            selected_property: options.selected_property,
          }),
        ]);
      }

      post = new FormData();
      post.append("file", fileInputNew);
      post.append("options", optionsRequest);
    }

    try {
      const res = await axios.post("/api/use_model/", post);

      setColumns(res.data.result.columns);
      setDataTable(res.data.result.data);

      setLoadingPredictNewData(false);
    } catch (error) {
      setSeverity("error");
      setMessage("Error predicting new data");
      setOpenSnackbar(true);
      setLoadingPredictNewData(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <Grid container spacing={4}>
          {selectedTaskType === "classification" && (
            <>
              <Grid item lg={12} xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Performance
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Set</TableCell>
                        <TableCell>Accuracy</TableCell>
                        {data.result.performance.f1 && (
                          <TableCell>F1</TableCell>
                        )}
                        {data.result.performance.f1_weighted && (
                          <TableCell>F1 Weighted</TableCell>
                        )}
                        {data.result.performance.recall && (
                          <TableCell>Recall</TableCell>
                        )}
                        {data.result.performance.recall_weighted && (
                          <TableCell>Recall Weighted</TableCell>
                        )}
                        {data.result.performance.precision && (
                          <TableCell>Precision</TableCell>
                        )}
                        {data.result.performance.precision_weighted && (
                          <TableCell>Precision Weighted</TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Training</TableCell>
                        {data.result.performance.accuracy && (
                          <TableCell>
                            {data.result.performance.accuracy}
                          </TableCell>
                        )}
                        {data.result.performance.f1 && (
                          <TableCell>{data.result.performance.f1}</TableCell>
                        )}
                        {data.result.performance.f1_weighted && (
                          <TableCell>
                            {data.result.performance.f1_weighted}
                          </TableCell>
                        )}
                        {data.result.performance.recall && (
                          <TableCell>
                            {data.result.performance.recall}
                          </TableCell>
                        )}
                        {data.result.performance.recall_weighted && (
                          <TableCell>
                            {data.result.performance.recall_weighted}
                          </TableCell>
                        )}
                        {data.result.performance.precision && (
                          <TableCell>
                            {data.result.performance.precision}
                          </TableCell>
                        )}
                        {data.result.performance.precision_weighted && (
                          <TableCell>
                            {data.result.performance.precision_weighted}
                          </TableCell>
                        )}
                      </TableRow>
                      <TableRow>
                        <TableCell>Testing</TableCell>
                        {data.result.performance_testing.accuracy && (
                          <TableCell>
                            {data.result.performance_testing.accuracy}
                          </TableCell>
                        )}
                        {data.result.performance_testing.f1 && (
                          <TableCell>
                            {data.result.performance_testing.f1}
                          </TableCell>
                        )}
                        {data.result.performance_testing.f1_weighted && (
                          <TableCell>
                            {data.result.performance_testing.f1_weighted}
                          </TableCell>
                        )}
                        {data.result.performance_testing.recall && (
                          <TableCell>
                            {data.result.performance_testing.recall}
                          </TableCell>
                        )}
                        {data.result.performance_testing.recall_weighted && (
                          <TableCell>
                            {data.result.performance_testing.recall_weighted}
                          </TableCell>
                        )}
                        {data.result.performance_testing.precision && (
                          <TableCell>
                            {data.result.performance_testing.precision}
                          </TableCell>
                        )}
                        {data.result.performance_testing.precision_weighted && (
                          <TableCell>
                            {data.result.performance_testing.precision_weighted}
                          </TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
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
                xl={data.result.analysis_testing ? 6 : 12}
                lg={data.result.analysis_testing ? 6 : 12}
                md={data.result.analysis_testing ? 6 : 12}
                sm={12}
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
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
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
              <Grid item xl={2} lg={2.5} md={2.8} sm={4} xs={12}>
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
                          {data.result.corr.kendall.kendalltau}
                        </TableCell>
                        <TableCell>{data.result.corr.kendall.pvalue}</TableCell>
                      </TableRow>
                      {data.result.corr_testing && (
                        <TableRow>
                          <TableCell>Kendall Testing</TableCell>
                          <TableCell>
                            {data.result.corr_testing.kendall.kendalltau}
                          </TableCell>
                          <TableCell>
                            {data.result.corr_testing.kendall.pvalue}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell>Pearson</TableCell>
                        <TableCell>
                          {data.result.corr.pearson.pearsonr}
                        </TableCell>
                        <TableCell>{data.result.corr.pearson.pvalue}</TableCell>
                      </TableRow>
                      {data.result.corr_testing && (
                        <TableRow>
                          <TableCell>Kendall Testing</TableCell>
                          <TableCell>
                            {data.result.corr_testing.pearson.pearsonr}
                          </TableCell>
                          <TableCell>
                            {data.result.corr_testing.pearson.pvalue}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell>Spearman</TableCell>
                        <TableCell>
                          {data.result.corr.spearman.spearmanr}
                        </TableCell>
                        <TableCell>
                          {data.result.corr.spearman.pvalue}
                        </TableCell>
                      </TableRow>
                      {data.result.corr_testing && (
                        <TableRow>
                          <TableCell>Kendall Testing</TableCell>
                          <TableCell>
                            {data.result.corr_testing.spearman.spearmanr}
                          </TableCell>
                          <TableCell>
                            {data.result.corr_testing.spearman.pvalue}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item lg={12} xs={12} marginTop={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Performance
                </Typography>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Set</TableCell>
                        {data.result.performance.neg_median_absolute_error && (
                          <TableCell>Negative Median Absolute Error</TableCell>
                        )}
                        {data.result.performance
                          .neg_root_mean_squared_error && (
                          <TableCell>
                            Negative Root Mean Squared Error
                          </TableCell>
                        )}
                        {data.result.performance.r2 && (
                          <TableCell>R2</TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.result.performance && (
                        <TableRow>
                          <TableCell>Training</TableCell>
                          <TableCell>
                            {data.result.performance.neg_median_absolute_error}
                          </TableCell>
                          <TableCell>
                            {
                              data.result.performance
                                .neg_root_mean_squared_error
                            }
                          </TableCell>
                          <TableCell>{data.result.performance.r2}</TableCell>
                        </TableRow>
                      )}
                      {data.result.performance_testing && (
                        <TableRow>
                          <TableCell>Testing</TableCell>
                          <TableCell>
                            {
                              data.result.performance_testing
                                .neg_median_absolute_error
                            }
                          </TableCell>
                          <TableCell>
                            {
                              data.result.performance_testing
                                .neg_root_mean_squared_error
                            }
                          </TableCell>
                          <TableCell>
                            {data.result.performance_testing.r2}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item lg={12} xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Scatter
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
              <Grid item lg={12} xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Error Plot
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
            </>
          )}
          <Grid item xl={2} lg={2.5} md={3} sm={5} xs={12}>
            {loadingButton ? (
              <LoadingButton
                loading
                variant="contained"
                color="primary"
                size="large"
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
                size="large"
              >
                Download Model
              </Button>
            )}
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2962ff",
                ":hover": { backgroundColor: "#2962ff" },
                width: "100%",
              }}
              size="large"
              onClick={() => setShowFormNewData(true)}
            >
              Use model with new data
            </Button>
          </Grid>
          {showFormNewData === true && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <form onSubmit={onSubmit}>
                  <Grid container spacing={2}>
                    <Grid item lg={12} xs={12}>
                      <FormControl>
                        <FormLabel id="label-file-type">File Type</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="label-file-type"
                          name="row-file-alignment-type"
                        >
                          <FormControlLabel
                            checked={fileType === "text"}
                            onChange={handleChangeFileType}
                            value="text"
                            control={<Radio />}
                            label="Text"
                          />
                          <FormControlLabel
                            checked={fileType === "file"}
                            onChange={handleChangeFileType}
                            value="file"
                            control={<Radio />}
                            label="File"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                      <TextField
                        label="Enter Amino Acid sequences"
                        multiline
                        rows={11}
                        sx={{ width: "100%" }}
                        value={textInput}
                        onChange={handleChangeTextInput}
                        disabled={fileType === "file"}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ marginTop: 1 }}>
                    <Grid item xl={3.15} lg={3.2} md={4.2} sm={4.25} xs={12}>
                      <label
                        htmlFor="contained-button-file-new"
                        style={{ width: "100%" }}
                      >
                        <Input
                          id="contained-button-file-new"
                          type="file"
                          onChange={handleChangeFileInputNew}
                        />
                        <Button
                          variant="outlined"
                          component="span"
                          endIcon={<CloudUploadIcon />}
                          color={
                            fileInputNew
                              ? fileInputNew.name
                                ? "success"
                                : "primary"
                              : "primary"
                          }
                          sx={{ width: "100%" }}
                          disabled={fileType === "text"}
                        >
                          {fileInputNew
                            ? fileInputNew.name
                              ? fileInputNew.name
                              : "Upload Fasta"
                            : "Upload Fasta"}
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={4}
                    sm={4.05}
                    xs={12}
                    sx={{ marginTop: 4.2 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        {loadingPredictNewData ? (
                          <LoadingButton
                            loading
                            variant="contained"
                            sx={{ width: "100%", backgroundColor: "#2962ff" }}
                            size="medium"
                          >
                            Loading{" "}
                          </LoadingButton>
                        ) : (
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={
                              textInput === "" &&
                              (fileInputNew === null ||
                                fileInputNew === undefined)
                            }
                            sx={{
                              width: "100%",
                              backgroundColor: "#2962ff",
                              ":hover": { backgroundColor: "#2962ff" },
                            }}
                            size="medium"
                          >
                            run
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          )}
          {dataTable.length > 0 && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DataTable
                  data={dataTable}
                  columns={columns}
                  title={"Model with new data"}
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default SupervisedLearningContent;
