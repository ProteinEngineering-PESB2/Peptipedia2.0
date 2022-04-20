import Plot from "react-plotly.js";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

import { useEffect, useState, useCallback } from "react";

import CircularLoading from "../CircularLoading";

const SupervisedLearningContent = ({ data, taskType }) => {
  const [dataHeatmap, setDataHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseDataHeatmap = useCallback(() => {
    console.log(data.result.confusion_matrix);
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

  useEffect(() => {
    if (taskType) {
      parseDataHeatmap();
    }
    setLoading(false);
  }, [parseDataHeatmap, taskType]);

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <Grid container spacing={3}>
          {taskType === "classification" && (
            <>
              <Grid item lg={12} xs={12} marginTop={2}>
                <Typography variant="h6">Confusion Matrix</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
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
