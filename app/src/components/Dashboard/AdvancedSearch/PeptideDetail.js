import { Typography, Grid, Box, Button } from "@mui/material";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function PeptideDetail({ peptideID, setPeptideID }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Peptide {peptideID}
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#2962ff",
                ":hover": { backgroundColor: "#2962ff" },
              }}
              onClick={() => setPeptideID(0)}
            >
              <KeyboardBackspaceIcon sx={{ fontSize: 30 }} />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
