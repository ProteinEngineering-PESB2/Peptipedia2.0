import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProSeqViewer from "../pro_seq_viewer";

interface Props {
  result: any;
  sequenceValue: string;
  handleChangeSequenceValue: (e: SelectChangeEvent) => void;
}

function StructuralPredictionContent({
  result,
  sequenceValue,
  handleChangeSequenceValue,
}: Props) {
  const [alignment, setAlignment] = useState(null);

  const handleShowSequence = () => {
    result.map((r: any) => {
        if (r.id === sequenceValue) {
            setAlignment(r.alignment)
        }
    });
  };

  useEffect(() => {
    handleShowSequence();
  }, [sequenceValue]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Box marginTop={3}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <FormControl>
                <InputLabel id="sequence-select-label">Sequence</InputLabel>
                <Select
                  labelId="sequence-select-label"
                  label="Sequence"
                  value={sequenceValue}
                  onChange={handleChangeSequenceValue}
                >
                  {result.map((r: any) => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Box
        marginTop={3}
        boxShadow={4}
        sx={{
          maxWidth: {
            xs: "20rem",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%",
          },
        }}
      >
        {alignment && <ProSeqViewer sequences={alignment} color={true}/>}
      </Box>
    </>
  );
}

export default StructuralPredictionContent;
