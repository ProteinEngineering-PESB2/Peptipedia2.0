import Plot from "react-plotly.js";

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

const ClusteringContent = ({ res }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isNormal, setIsNormal] = useState();
  const [path, setPath] = useState("");
  const [kernel, setKernel] = useState("linear");
  const [dataScatter, setDataScatter] = useState([]);
  const [layoutScatter, setLayoutScatter] = useState({});
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const res = await pca(post);

      const dataTable = [];
      const uniqueLabels = [];
      const x_values = [];
      const y_values = [];
      res.forEach((r) => {
        dataTable.push([r.id, r.label, r.X, r.Y]);

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

        res.forEach((r) => {
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

      x_max = parseInt(x_max) + 5
      x_min = parseInt(x_min) - 5
      y_max = parseInt(y_max) + 5
      y_min = parseInt(y_min) - 5

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

      setData(dataTable);
      setDataScatter(traces);
      setLayoutScatter(layout);

      setColumns(["Sequence", "Label", "X", "Y"]);
      setLoading(false);
    } catch (error) {}
  };

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item lg={3.5} md={12} xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item lg={5.5} xs={6}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#2962ff",
                        width: "100%",
                        height: "100%",
                        ":hover": { backgroundColor: "#2962ff" },
                      }}
                      size="large"
                      onClick={handlePCA}
                    >
                      Apply PCA
                    </Button>
                  </Grid>
                  <Grid item lg={6.5} xs={6}>
                    <FormControl fullWidth disabled={isNormal ? true : false}>
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
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ marginTop: 1 }}>
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
            {dataScatter.length > 0 && (
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
                    layout={layoutScatter}
                    useResizeHandler
                    className="w-full"
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default ClusteringContent;
