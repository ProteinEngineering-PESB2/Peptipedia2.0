import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ActivityPrediction } from "../../pages/ActivityPrediction";
import { ITable } from "../../utils/interfaces";
import DataTable from "../datatable";

type ActivityPredictionTableProps = {
  result: ActivityPrediction[];
};

function ActivityPredictionTable({ result }: ActivityPredictionTableProps) {
  const [selectedSequence, setSelectedSequence] = useState<string>(
    result[0].id
  );
  const [selectedTable, setSelectedTable] = useState<ITable>({
    columns: [],
    data: [],
  });

  const handleTable = (sequence: string) => {
    result.map((r: ActivityPrediction) => {
      if (r.id === sequence) {
        setSelectedTable({
          columns: r.columns,
          data: r.data,
        });
      }
    });
  };

  const handleSelectedSequence = (e: SelectChangeEvent) => {
    setSelectedSequence(e.target.value as string);
    handleTable(e.target.value);
  };

  useEffect(() => {
    console.log(result)
    handleTable(result[0].id);
  }, []);

  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <Paper
          sx={{ p: 2, display: "flex", flexDirection: "column", boxShadow: 4 }}
        >
          <FormControl sx={{ maxWidth: "18rem", marginBottom: 2 }}>
            <InputLabel id="sequence-select-label">Sequence</InputLabel>
            <Select
              id="sequence-select-label"
              label="Sequence"
              value={selectedSequence}
              onChange={handleSelectedSequence}
            >
              {result.map((r: ActivityPrediction) => (
                <MenuItem key={r.id} value={r.id}>
                  {r.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DataTable title="" table={selectedTable} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ActivityPredictionTable;
