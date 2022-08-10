import { Box, Paper } from "@mui/material";
import { useDataTablePhysicochemical } from "../../hooks/useDataTablePhysicochemical";
import { IDataPhysichochemical } from "../../utils/interfaces";
import DataTable from "../datatable";

const env = import.meta.env;
const backendURL = env.PROD ? env.VITE_BACKEND_BASEURL : "http://localhost:8001";

interface Props {
  result: IDataPhysichochemical[];
}

export default function PhysichochemicalContent({ result }: Props) {
  const { table, imagePlot } = useDataTablePhysicochemical({ result });

  return (
    <>
      <Box marginTop={3} boxShadow={4}>
        <DataTable title="Physichochemical Properties Result" table={table} />
      </Box>

      {imagePlot !== "" && (
        <Box marginTop={3} boxShadow={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              maxHeight: 1000,
              overflowX: "scroll",
              overflowY: "scroll",
            }}
          >
            <img
              src={`${backendURL}${imagePlot}`}
              alt="plot"
              width="100%"
              height="100%"
            />
          </Paper>
        </Box>
      )}
    </>
  );
}
