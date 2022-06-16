import { Box, Paper } from "@mui/material";
import { useDataTablePhysicochemical } from "../../pages/useDataTablePhysicochemical";
import { IDataPhysichochemical } from "../../utils/interfaces";
import DataTable from "../datatable";

interface Props {
  result: IDataPhysichochemical[];
}

export default function PhysichochemicalContent({ result }: Props) {
  const { table } = useDataTablePhysicochemical({ result });

  return (
    <>
      <Box marginTop={3} boxShadow={4}>
        <DataTable title="Physichochemical Properties Result" table={table} />
      </Box>
    </>
  );
}
