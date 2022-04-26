import Plot from "react-plotly.js";
import axios from "axios";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { pca } from "../../../services/clustering";

import DataTable from "../DataTable";
import CircularLoading from "../CircularLoading";
import { Box } from "@mui/system";

const ClusteringContent = ({
  res,
  setMessage,
  setSeverity,
  setOpenSnackbar,
}) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isNormal, setIsNormal] = useState();
  const [path, setPath] = useState("");
  const [pathPCA, setPathPCA] = useState("");
  const [kernel, setKernel] = useState("linear");
  const [dataScatter, setDataScatter] = useState([]);
  const [layoutScatter, setLayoutScatter] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingPCA, setLoadingPCA] = useState(false);

  useEffect(() => {
    setLoading(true);

    const dataTable = [];

    res.data.forEach((d) => {
      dataTable.push([d.id, d.label]);
    });
    setData(dataTable);
    setColumns(["Sequence", "Label"]);

    const valuesChart = [];
    const labelsChart = [];

    res.resume.forEach((r) => {
      valuesChart.push(r.value);
      labelsChart.push(`Cluster ${r.category}`);
    });
    setValues(valuesChart);
    setLabels(labelsChart);

    setIsNormal(res.is_normal);
    setPath(res.encoding_path);

    setLoading(false);
  }, [res]);

  const handleChangeKernel = (e) => {
    setKernel(e.target.value);
  };

  const handlePCA = async () => {
    setLoadingPCA(true);
    setDataScatter([]);

    let post;

    if (isNormal) {
      post = {
        params: {
          path: path,
        },
      };
    } else {
      post = {
        params: {
          path: path,
          kernel: kernel,
        },
      };
    }

    try {
      const res = await pca(post);

      setPathPCA(res.path);

      const uniqueLabels = [];
      const x_values = [];
      const y_values = [];
      res.result.forEach((r) => {
        if (!uniqueLabels.includes(r.label)) {
          uniqueLabels.push(r.label);
        }

        x_values.push(r.X);
        y_values.push(r.Y);
      });

      const traces = [];

      for (let label in uniqueLabels) {
        const x = [];
        const y = [];
        const text = [];

        res.result.forEach((r) => {
          if (r.label === parseInt(label)) {
            x.push(r.X);
            y.push(r.Y);
            text.push(r.id);
          }
        });

        const trace = {
          x: x,
          y: y,
          mode: "markers",
          type: "scatter",
          name: `Label ${label}`,
          text: text,
          marker: { size: 12 },
        };

        traces.push(trace);
      }

      let x_max = Math.max(...x_values);
      let x_min = Math.min(...x_values);
      let y_max = Math.max(...y_values);
      let y_min = Math.min(...y_values);

      x_max = parseInt(x_max) + 5;
      x_min = parseInt(x_min) - 5;
      y_max = parseInt(y_max) + 5;
      y_min = parseInt(y_min) - 5;

      const layout = {
        xaxis: {
          range: [x_min, x_max],
        },
        yaxis: {
          range: [y_min, y_max],
        },
        title: "Clustering With PCA",
        autosize: true,
        height: 600,
        margin: {
          l: 50,
          r: 50,
          b: 100,
          t: 100,
          pad: 4,
        },
      };

      setDataScatter(traces);
      setLayoutScatter(layout);
      setLoadingPCA(false);
    } catch (error) {
      setSeverity("error");
      setMessage("Error to aplicate PCA");
      setOpenSnackbar(true);
      setLoadingPCA(false);
    }
  };

  const downloadClustering = async () => {
    const res = await axios.get(path, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "clustering.csv");
    document.body.appendChild(link);
    link.click();
  };

  const downloadPCA = async () => {
    const res = await axios.get(pathPCA, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "pca.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xl={2} lg={2.5} md={3.5} sm={5} xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2962ff",
                  width: "100%",
                  ":hover": { backgroundColor: "#2962ff" },
                }}
                size="medium"
                onClick={downloadClustering}
              >
                Download Clustering
              </Button>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DataTable
                  title="Clustering Table"
                  data={data}
                  columns={columns}
                />
              </Paper>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <Typography variant="h6">Clustering Performance</Typography>
            </Grid>
            <Grid item lg={6} md={8} xs={12}>
              <div className="table-responsive">
                <table
                  className="table table-light table-hover text-center"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Calinski</th>
                      <th>Dalvies</th>
                      <th>Siluetas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-active">
                      <td>{res.performance.calinski}</td>
                      <td>{res.performance.dalvies}</td>
                      <td>{res.performance.siluetas}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            <Grid item lg={12} md={12} xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Plot
                  data={[
                    {
                      values: values,
                      labels: labels,
                      type: "pie",
                      textinfo: "label+percent",
                      textposition: "outside",
                      automargin: true,
                    },
                  ]}
                  layout={{
                    autosize: true,
                    margin: { t: 0, b: 0, l: 0, r: 0 },
                  }}
                  useResizeHandler
                  className="w-full"
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xl={1.5} lg={2} md={2} sm={3} xs={6}>
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
                      Apply Pca
                    </Button>
                  </Grid>
                  <Grid item xl={1.5} lg={2} md={2} sm={3} xs={6}>
                    {isNormal === false && (
                      <FormControl fullWidth>
                        <InputLabel id="kernel-label">Kernel</InputLabel>
                        <Select
                          labelId="kernel-label"
                          value={kernel}
                          onChange={handleChangeKernel}
                          label="Kernel"
                        >
                          <MenuItem value="linear">Linear</MenuItem>
                          <MenuItem value="poly">Poly</MenuItem>
                          <MenuItem value="rbf">RBF</MenuItem>
                          <MenuItem value="sigmoid">Sigmoid</MenuItem>
                          <MenuItem value="cosine">Cosinie</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  {loadingPCA ? (
                    <Box sx={{ marginTop: 4 }}>
                      <CircularLoading />
                    </Box>
                  ) : (
                    dataScatter.length > 0 && (
                      <Grid container spacing={4}>
                        <Grid
                          item
                          lg={12}
                          md={12}
                          xs={12}
                          sx={{ marginTop: 4 }}
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
                              layout={layoutScatter}
                              useResizeHandler
                              className="w-full"
                            />
                          </Paper>
                        </Grid>
                        <Grid item xl={2} lg={3} md={3} sm={5} xs={12}>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#2962ff",
                              ":hover": { backgroundColor: "#2962ff" },
                              width: "100%",
                            }}
                            size="large"
                            onClick={downloadPCA}
                          >
                            Download PCA
                          </Button>
                        </Grid>
                      </Grid>
                    )
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ marginTop: 4 }}></Grid>
        </>
      )}
    </>
  );
};

export default ClusteringContent;
