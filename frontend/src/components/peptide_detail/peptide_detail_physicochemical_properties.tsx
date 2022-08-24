import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { IDataInfo } from "../../hooks/useGetInfoPeptideDetail";

interface Props {
  dataInfo: IDataInfo;
}

export default function PeptideDetailPhysicochemicalProperties({
  dataInfo,
}: Props) {
  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <TableContainer component={Paper} sx={{ boxShadow: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Length</TableCell>
                <TableCell>Molecular Weight</TableCell>
                <TableCell>Isoelectric Point</TableCell>
                <TableCell>Charge</TableCell>
                <TableCell>Charge Density</TableCell>
                <TableCell>Aliphatic Index</TableCell>
                <TableCell>Aromaticity</TableCell>
                <TableCell>Boman Index</TableCell>
                <TableCell>Hydrophobic Ratio</TableCell>
                <TableCell>Instability Index</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{dataInfo.length}</TableCell>
                <TableCell>{dataInfo.molecular_weight}</TableCell>
                <TableCell>{dataInfo.isoelectric_point}</TableCell>
                <TableCell>{dataInfo.charge}</TableCell>
                <TableCell>{dataInfo.charge_density}</TableCell>
                <TableCell>{dataInfo.aliphatic_index}</TableCell>
                <TableCell>{dataInfo.aromaticity}</TableCell>
                <TableCell>{dataInfo.boman_index}</TableCell>
                <TableCell>{dataInfo.hydrophobic_ratio}</TableCell>
                <TableCell>{dataInfo.instability_index}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
