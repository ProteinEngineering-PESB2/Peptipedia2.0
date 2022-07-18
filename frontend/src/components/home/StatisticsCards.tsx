import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";

export default function StatisticsCards() {
  return (
    <Grid container spacing={2} sx={{ marginTop: 5 }}>
      <Grid item xl={3}>
        <Card variant="outlined" sx={{ boxShadow: 3, p: 1 }}>
          <CardContent>
            <Box
              height="100%"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  30
                </Typography>
                <Typography fontWeight="400" variant="h6">
                  Databases
                </Typography>
              </Box>
              <StorageIcon fontSize="large" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xl={3}>
        <Card variant="outlined" sx={{ boxShadow: 3, p: 1 }}>
          <CardContent>
            <Box
              height="100%"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  30
                </Typography>
                <Typography fontWeight="400" variant="h6">
                  Databases
                </Typography>
              </Box>
              <StorageIcon fontSize="large" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xl={3}>
        <Card variant="outlined" sx={{ boxShadow: 3, p: 1 }}>
          <CardContent>
            <Box
              height="100%"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  30
                </Typography>
                <Typography fontWeight="400" variant="h6">
                  Databases
                </Typography>
              </Box>
              <StorageIcon fontSize="large" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xl={3}>
        <Card variant="outlined" sx={{ boxShadow: 3, p: 1 }}>
          <CardContent>
            <Box
              height="100%"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  30
                </Typography>
                <Typography fontWeight="400" variant="h6">
                  Databases
                </Typography>
              </Box>
              <StorageIcon fontSize="large" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
