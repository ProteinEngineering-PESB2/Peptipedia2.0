import {
  Box,
  Paper,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import { useDataTableClustering } from "../../hooks/useDataTableClustering";
import { usePieChartClustering } from "../../hooks/usePieChartClustering";
import { IDataClustering } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonDownloadPrimary from "../button_download_primary";
import PieChart from "../charts/pie_chart";
import DataTable from "../datatable";

interface Props {
  result: IDataClustering;
}

export default function ClusteringContent({ result }: Props) {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  const { table } = useDataTableClustering({ result });
  const { values, labels } = usePieChartClustering({ result });

  return (
    <>
      <BackdropComponent open={openBackdrop} percentage={percentage} />
      <Box marginTop={3}>
        <ButtonDownloadPrimary
          path={result.encoding_path}
          name="encoding.csv"
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
        />
      </Box>
      <Box marginTop={3} boxShadow={4}>
        <DataTable table={table} title="Clustering Results" />
      </Box>
      <Box
        marginTop={3}
        boxShadow={4}
        sx={{
          width: {
            xs: "100%",
            sm: "35rem",
            md: "35rem",
            lg: "35rem",
            xl: "35rem",
          },
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {result.performance.calinski && (
                  <TableCell>Calinski-Harabasz index</TableCell>
                )}
                {result.performance.dalvies && (
                  <TableCell>Davies-Bouldin Index</TableCell>
                )}
                {result.performance.siluetas && (
                  <TableCell>Davies-Bouldin Index</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {result.performance.calinski && (
                  <TableCell>{result.performance.calinski}</TableCell>
                )}
                {result.performance.dalvies && (
                  <TableCell>{result.performance.dalvies}</TableCell>
                )}
                {result.performance.siluetas && (
                  <TableCell>{result.performance.siluetas}</TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box marginTop={3} boxShadow={4}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <PieChart labels={labels} values={values} />
        </Paper>
      </Box>
    </>
  );
}
