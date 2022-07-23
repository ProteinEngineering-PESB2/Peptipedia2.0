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
} from "@mui/material";
import { useState } from "react";
import { useDataTableClustering } from "../../hooks/useDataTableClustering";
import { usePCAClustering } from "../../hooks/usePCAClustering";
import { usePieChartClustering } from "../../hooks/usePieChartClustering";
import { useSelectLinearClustering } from "../../hooks/useSelectLinearClustering";
import { IDataClustering } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonDownloadPrimary from "../button_download_primary";
import PieChart from "../charts/pie_chart";
import ScatterPlot from "../charts/scatter_plot";
import DataTable from "../datatable";
import SelectComponent from "../form/select_component";

interface Props {
  result: IDataClustering;
}

export default function ClusteringContent({ result }: Props) {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [openBackdropPCA, setOpenBackdropPCA] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  const { table } = useDataTableClustering({ result });
  const { values, labels } = usePieChartClustering({ result });
  const { selectedKernel, handleChangeSelectedKernel, kernels } =
    useSelectLinearClustering();
  const { handlePCA, pathPCA, dataScatter, xmin, xmax, ymin, ymax } =
    usePCAClustering({
      is_normal: result.is_normal,
      kernel: selectedKernel,
      path: result.encoding_path,
      setOpenBackdropPCA,
    });

  return (
    <>
      <BackdropComponent open={openBackdrop} percentage={percentage} />
      <BackdropComponent open={openBackdropPCA} />
      <Box marginTop={3}>
        <ButtonDownloadPrimary
          path={result.encoding_path}
          name="encoding.csv"
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
          title="encoding"
        />
      </Box>
      <Box marginTop={3} boxShadow={4}>
        <DataTable table={table} title="Clustering Results" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xl={5} lg={8} md={12} sm={12} xs={12}>
          <TableContainer component={Paper} sx={{ boxShadow: 4, marginTop: 3 }}>
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
      <Box marginTop={3} boxShadow={4}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <PieChart labels={labels} values={values} />
        </Paper>
      </Box>
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
