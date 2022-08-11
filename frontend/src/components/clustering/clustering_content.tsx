import {
  Box,
  Paper,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDataTableClustering } from "../../hooks/useDataTableClustering";
import { usePCAClustering } from "../../hooks/usePCAClustering";
import { useSelectLinearClustering } from "../../hooks/useSelectLinearClustering";
import BackdropComponent from "../backdrop_component";
import ButtonDownloadPrimary from "../button_download_primary";
import PieChart from "../charts/pie_chart";
import ScatterPlot from "../charts/scatter_plot";
import DataTable from "../datatable";
import SelectComponent from "../form/select_component";
import { Graph } from "react-d3-graph";

interface Props {
  result: any;
}

// the graph configuration, just override the ones you need
const onClickNode = function (nodeId: any) {
  window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function (source: any, target: any) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

export default function ClusteringContent({ result }: Props) {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [openBackdropPCA, setOpenBackdropPCA] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  const { table } = useDataTableClustering({ result });
  const { selectedKernel, handleChangeSelectedKernel, kernels } =
    useSelectLinearClustering();
  const { handlePCA, pathPCA, dataScatter, xmin, xmax, ymin, ymax } =
    usePCAClustering({
      is_normal: result.is_normal,
      kernel: selectedKernel,
      path: result.encoding_path,
      setOpenBackdropPCA,
    });
  const [widthGraph, setWithGraph] = useState(1050);
  const [heightGraph, setHeighGraph] = useState(700);
  const [nodeSize, setNodeSize] = useState(500);

  const myConfig = {
    node: {
      size: nodeSize ? nodeSize : 50,
      highlightStrokeColor: "blue",
      fontSize: 10,
    },
    link: {
      highlightColor: "lightblue",
    },
    d3: {
      linkLength: 200,
      gravity: -200,
      linkStrength: 2,
    },
    height: heightGraph ? heightGraph : 700,
    width: widthGraph ? widthGraph : 1050,
  };

  return (
    <>
      <BackdropComponent open={openBackdrop} percentage={percentage} />
      <BackdropComponent open={openBackdropPCA} />
      {result.clustering_type === "unsupervised_learning" && (
        <Box marginTop={3}>
          <ButtonDownloadPrimary
            path={result.encoding_path}
            name="encoding.csv"
            setOpenBackdrop={setOpenBackdrop}
            setPercentage={setPercentage}
            title="encoding"
          />
        </Box>
      )}
      {result.clustering_type === "graph_clustering_alignments" && (
        <>
          <Box marginTop={3}>
            <ButtonDownloadPrimary
              path={result.alignment_path}
              name="alignment.aln"
              setOpenBackdrop={setOpenBackdrop}
              setPercentage={setPercentage}
              title="alignment"
            />
          </Box>
        </>
      )}
      <Box marginTop={3} boxShadow={4}>
        <DataTable table={table} title="Clustering Results" />
      </Box>
      {result.clustering_type === "graph_clustering_alignments" && (
        <>
          <Box marginTop={3}>
            <ButtonDownloadPrimary
              path={result.distances_path}
              name="distances.dist"
              setOpenBackdrop={setOpenBackdrop}
              setPercentage={setPercentage}
              title="distances"
            />
          </Box>
        </>
      )}
      {(result.clustering_type === "graph_clustering_alignments" ||
        result.clustering_type === "graph_clustering_distances") && (
        <Grid container spacing={2}>
          <Grid item xl={2} lg={2} md={3} sm={4} xs={5}>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: 4, marginTop: 3 }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {result.performance.Modularity !== null && (
                      <TableCell>Modularity</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {result.performance.Modularity !== null && (
                      <TableCell>{result.performance.Modularity}</TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
      {result.clustering_type === "unsupervised_learning" && (
        <Grid container spacing={2}>
          <Grid item xl={5} lg={8} md={12} sm={12} xs={12}>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: 4, marginTop: 3 }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {result.performance.calinski !== null && (
                      <TableCell>Calinski-Harabasz index</TableCell>
                    )}
                    {result.performance.dalvies !== null && (
                      <TableCell>Davies-Bouldin Index</TableCell>
                    )}
                    {result.performance.siluetas !== null && (
                      <TableCell>Silhouette Coefficient</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {result.performance.calinski !== null && (
                      <TableCell>{result.performance.calinski}</TableCell>
                    )}
                    {result.performance.dalvies !== null && (
                      <TableCell>{result.performance.dalvies}</TableCell>
                    )}
                    {result.performance.siluetas !== null && (
                      <TableCell>{result.performance.siluetas}</TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
      <Box marginTop={3} boxShadow={4}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <PieChart
            labels={result.resume.labels}
            values={result.resume.value}
            markers={result.resume.marker}
          />
        </Paper>
      </Box>
      {result.clustering_type !== "unsupervised_learning" && (
        <Box marginTop={3} boxShadow={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container spacing={2} marginBottom={3}>
              <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                <TextField
                  label="Width"
                  type="number"
                  value={widthGraph}
                  onChange={(e) => setWithGraph(parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                <TextField
                  label="Height"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={heightGraph}
                  onChange={(e) => setHeighGraph(parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                <TextField
                  label="Node Size"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={nodeSize}
                  onChange={(e) => setNodeSize(parseInt(e.target.value))}
                />
              </Grid>
            </Grid>
            <Graph
              id="graph-id" // id is mandatory
              data={result.graph}
              config={myConfig}
              onClickNode={onClickNode}
              onClickLink={onClickLink}
            />
          </Paper>
        </Box>
      )}
      {result.clustering_type === "unsupervised_learning" && (
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
      )}
    </>
  );
}
