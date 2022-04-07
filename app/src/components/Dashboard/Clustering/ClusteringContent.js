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
import CircularLoading from "../CircularLoading"

const columns = ["Sequence", "Label"];

const ClusteringContent = ({ res }) => {
  const [data, setData] = useState([]);
  const [values, setValues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isNormal, setIsNormal] = useState();
  const [path, setPath] = useState("");
  const [kernel, setKernel] = useState("linear");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const dataTable = [];

    res.data.forEach((d) => {
      dataTable.push([d.id, d.label]);
    });
    setData(dataTable);

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
    let post 

    if (isNormal) {
      post = {
        "params": {
          "path": path
        }
      }
    } else {
      post = {
        "params": {
          "path": path,
          "kernel": kernel
        }
      }
    }

    try {
      console.log(post)
      await pca(post)
    } catch (error) {

    }
  };

  return (
    <>
      {loading ? (
        <CircularLoading/>
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
            <Grid item lg={6} md={8} xs={12}>
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
                    height: 400,
                    margin: { t: 0, b: 0, l: 0, r: 0 },
                  }}
                  useResizeHandler
                  className="w-full"
                />
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ClusteringContent;
