import Plot from "react-plotly.js";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

import { useEffect, useState, useCallback } from "react";

import CircularLoading from "../CircularLoading";

const SupervisedLearningContent = ({ data, taskType }) => {
  const [dataHeatmap, setDataHeatmap] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [dataErrorBars, setDataErrorBars] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setDataHeatmap(array);
  }, [data]);

  const parseDataLearningCurve = useCallback(() => {
    console.log(data.result.learning_curve);
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
      line: {color: "rgb(0,100,80)"}, 
      mode: "lines",
      name: "Training",
      type: "scatter",
    };

    const traceTesting = {
      x: data.result.learning_curve.testing.x,
      y: data.result.learning_curve.testing.y,
      line: {color: "rgb(0,176,246)"}, 
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

    setDataBar([traceSensibility, traceSensivity]);
  }, [data]);

  useEffect(() => {
    if (taskType) {
      parseDataHeatmap();
      parseDataLearningCurve();
      parseDataSensibility();
    }
    setLoading(false);
  }, [
    parseDataHeatmap,
    taskType,
    parseDataLearningCurve,
    parseDataSensibility,
  ]);

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <Grid container spacing={3}>
          {taskType === "classification" && (
            <>
              <Grid item lg={12} xs={12} marginTop={2}>
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
                        <th>F1 Weighted</th>
                        <th>Recall Weighted</th>
                        <th>Precision Weighted</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-active">
                        <td>{data.result.performance.accuracy}</td>
                        <td>{data.result.performance.f1_weighted}</td>
                        <td>{data.result.performance.recall_weighted}</td>
                        <td>{data.result.performance.precision_weighted}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Grid>
              <Grid item lg={12} xs={12} marginTop={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Confusion Matrix
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
              <Grid item lg={12} xs={12} marginTop={2}>
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
                      xaxis: { title: "Training Examples" },
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
              <Grid item lg={12} md={12} xs={12}>
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
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default SupervisedLearningContent;
